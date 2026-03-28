BEGIN;

CREATE TABLE sets (
    set_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    release_date VARCHAR(255) DEFAULT NULL
);

CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    set_id INTEGER,
    number VARCHAR(255) NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    release_date TIMESTAMPTZ DEFAULT NULL,
    artist VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (set_id) REFERENCES sets(set_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULl,
    password_hash VARCHAR(255) NOT NULL,
    is_verified BOOL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    validation_token VARCHAR(255) DEFAULT NULL,
    validation_token_expiry TIMESTAMPTZ DEFAULT NULL,
    refresh_token VARCHAR(255) DEFAULT NULL
);

CREATE TYPE card_condition AS ENUM('nm', 'lp', 'mp', 'hp', 'dmg');
CREATE TABLE portfolios (
    portfolio_id SERIAL PRIMARY KEY,
    user_id INT,
    card_id INT, 
    condition card_condition DEFAULT 'nm',
    purchase_price SMALLINT DEFAULT NULL,
    purchase_date TIMESTAMPTZ DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (card_id) REFERENCES cards(card_id)
);

CREATE TABLE wishlists (
    wishlist_id SERIAL PRIMARY KEY,
    user_id INT,
    card_id INT, 
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (card_id) REFERENCES cards(card_id)
);

COMMIT;
