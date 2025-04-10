package models

import (
	"database/sql"
	"errors"
	"time"

	"github.com/yourusername/ums/backend/internal/db"
)

type User struct {
	ID        string    `json:"id" db:"id"`
	Username  string    `json:"username" db:"username"`
	Password  string    `json:"password" db:"password"`
	Email     string    `json:"email" db:"email"`
	IsAdmin   bool      `json:"is_admin" db:"is_admin"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

func (u *User) BeforeSave() {
	// Logic to hash password or set default values can be added here
}

// GetUserByID retrieves a user by ID
func GetUserByID(id string) (User, error) {
	var user User

	query := `
		SELECT id, username, password, email, is_admin, created_at, updated_at
		FROM users
		WHERE id = $1
	`

	err := db.GetDB().QueryRow(query, id).Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.IsAdmin,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return user, errors.New("user not found")
	}

	return user, err
}

// GetUserByUsername retrieves a user by username
func GetUserByUsername(username string) (User, error) {
	var user User

	query := `
		SELECT id, username, password, email, is_admin, created_at, updated_at
		FROM users
		WHERE username = $1
	`

	err := db.GetDB().QueryRow(query, username).Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.IsAdmin,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return user, errors.New("user not found")
	}

	return user, err
}

// GetAllUsers retrieves all users
func GetAllUsers() ([]User, error) {
	var users []User

	query := `
		SELECT id, username, password, email, is_admin, created_at, updated_at
		FROM users
		ORDER BY id
	`

	rows, err := db.GetDB().Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Password,
			&user.Email,
			&user.IsAdmin,
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

// CreateUser adds a new user to the database
func CreateUser(user *User) error {
	query := `
		INSERT INTO users (username, password, email, is_admin, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id
	`

	now := time.Now()

	err := db.GetDB().QueryRow(
		query,
		user.Username,
		user.Password,
		user.Email,
		user.IsAdmin,
		now,
		now,
	).Scan(&user.ID)

	return err
}

// UpdateUser updates a user
func UpdateUser(user User) (User, error) {
	query := `
		UPDATE users
		SET username = $1, email = $2, is_admin = $3, updated_at = $4
		WHERE id = $5
		RETURNING id, username, password, email, is_admin, created_at, updated_at
	`

	now := time.Now()

	err := db.GetDB().QueryRow(
		query,
		user.Username,
		user.Email,
		user.IsAdmin,
		now,
		user.ID,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.IsAdmin,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	return user, err
}

// DeleteUser deletes a user
func DeleteUser(id string) error {
	query := `DELETE FROM users WHERE id = $1`

	_, err := db.GetDB().Exec(query, id)
	return err
}