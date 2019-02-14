CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL,
    verify_key VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);
