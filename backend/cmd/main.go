package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/gorilla/mux"
    _ "github.com/lib/pq"
)

var db *sql.DB

// User represents a user in the system
type User struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"password,omitempty"`
	Email     string    `json:"email"`
	IsAdmin   bool      `json:"is_admin"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// AuthRequest represents a login or register request
type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email,omitempty"`
}

func main() {
	// Initialize database connection
	// Note: Update these credentials to match your PostgreSQL setup
	connectionString := "host=localhost port=5432 user=postgres password=postgres dbname=ums_db sslmode=disable"
	var err error
	db, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	fmt.Println("Database connection established")

	// Create a new router
	r := mux.NewRouter()
	apiRouter := r.PathPrefix("/api").Subrouter()

	// Auth routes
	apiRouter.HandleFunc("/register", registerHandler).Methods("POST")
	apiRouter.HandleFunc("/login", loginHandler).Methods("POST")

	// User routes
	apiRouter.HandleFunc("/users", getUsersHandler).Methods("GET")
	apiRouter.HandleFunc("/users/{id}", getUserHandler).Methods("GET")
	apiRouter.HandleFunc("/users/{id}", updateUserHandler).Methods("PUT")
	apiRouter.HandleFunc("/users/{id}", deleteUserHandler).Methods("DELETE")

	// Dashboard stats route
	apiRouter.HandleFunc("/dashboard/stats", dashboardStatsHandler).Methods("GET")

	// Set up CORS middleware
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	})

	// Create a server
	server := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	// Start the server in a goroutine
	go func() {
		log.Println("Server is running on :8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Set up graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Server is shutting down...")
}

// registerHandler handles user registration
func registerHandler(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if user already exists
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM users WHERE username = $1", req.Username).Scan(&count)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if count > 0 {
		http.Error(w, "Username already exists", http.StatusBadRequest)
		return
	}

	// Create new user
	now := time.Now()
	var userID int
	isAdmin := false
	if req.Username == "admin" {
		isAdmin = true
	}
	err = db.QueryRow(
		"INSERT INTO users (username, password, email, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
		req.Username, req.Password, req.Email, isAdmin, now, now,
	).Scan(&userID)

	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	// Return the created user
	user := User{
		ID:        userID,
		Username:  req.Username,
		Email:     req.Email,
		IsAdmin:   isAdmin,
		CreatedAt: now,
		UpdatedAt: now,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

// loginHandler handles user login
func loginHandler(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Find user by username
	var user User
	err := db.QueryRow(
		"SELECT id, username, password, email, is_admin, created_at, updated_at FROM users WHERE username = $1",
		req.Username,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.IsAdmin,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Check password
	if user.Password != req.Password {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Don't return the password
	user.Password = ""

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// getUsersHandler returns all users
func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, username, email, is_admin, created_at, updated_at FROM users ORDER BY id")
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.IsAdmin,
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		users = append(users, user)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// getUserHandler returns a specific user
func getUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID := vars["id"]

	var user User
	err := db.QueryRow(
		"SELECT id, username, email, is_admin, created_at, updated_at FROM users WHERE id = $1",
		userID,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.IsAdmin,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// updateUserHandler updates a user
func updateUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID := vars["id"]

	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	now := time.Now()
	err := db.QueryRow(
		"UPDATE users SET username = $1, email = $2, updated_at = $3 WHERE id = $4 RETURNING id, username, email, is_admin, created_at, updated_at",
		user.Username, user.Email, now, userID,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.IsAdmin,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// deleteUserHandler deletes a user
func deleteUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID := vars["id"]

	_, err := db.Exec("DELETE FROM users WHERE id = $1", userID)
	if err != nil {
		http.Error(w, "Failed to delete user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// dashboardStatsHandler returns statistics for the dashboard
func dashboardStatsHandler(w http.ResponseWriter, r *http.Request) {
	type Stats struct {
		TotalUsers   int `json:"totalUsers"`
		AdminUsers   int `json:"adminUsers"`
		RegularUsers int `json:"regularUsers"`
	}

	var stats Stats
	// Query total users
	err := db.QueryRow("SELECT COUNT(*) FROM users").Scan(&stats.TotalUsers)
	if err != nil {
		http.Error(w, "Failed to fetch total users", http.StatusInternalServerError)
		return
	}
	// Query admin users
	err = db.QueryRow("SELECT COUNT(*) FROM users WHERE is_admin = true").Scan(&stats.AdminUsers)
	if err != nil {
		http.Error(w, "Failed to fetch admin users", http.StatusInternalServerError)
		return
	}
	// Query regular users
	err = db.QueryRow("SELECT COUNT(*) FROM users WHERE is_admin = false").Scan(&stats.RegularUsers)
	if err != nil {
		http.Error(w, "Failed to fetch regular users", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}