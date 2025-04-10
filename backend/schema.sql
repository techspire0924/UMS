-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Create initial admin user (password: admin123)
INSERT INTO users (username, password, email, is_admin, created_at, updated_at)
VALUES ('admin', 'admin123', 'admin@example.com', TRUE, NOW(), NOW())
ON CONFLICT (username) DO NOTHING;
