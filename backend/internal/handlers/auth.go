package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/yourusername/ums/backend/internal/models"
)

type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user := models.User{
		Username: req.Username,
		Password: req.Password, // You should hash the password before saving
		Email:    req.Email,
	}

	if err := models.CreateUser(&user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := models.GetUserByUsername(req.Username)
	if err != nil || user.Password != req.Password { // Validate password properly
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate a token or session here

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
