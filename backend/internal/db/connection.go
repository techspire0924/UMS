package db

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/lib/pq" // PostgreSQL driver
)

var db *sql.DB

// Connect establishes a connection to the database
func Connect(connectionString string) {
    var err error
    db, err = sql.Open("postgres", connectionString)
    if err != nil {
        log.Fatalf("Error opening database: %v", err)
    }

    err = db.Ping()
    if err != nil {
        log.Fatalf("Error connecting to the database: %v", err)
    }

    fmt.Println("Database connection established")
}

// Disconnect closes the database connection
func Disconnect() {
    if err := db.Close(); err != nil {
        log.Fatalf("Error closing the database: %v", err)
    }
    fmt.Println("Database connection closed")
}

// GetDB returns the database connection
func GetDB() *sql.DB {
    return db
}