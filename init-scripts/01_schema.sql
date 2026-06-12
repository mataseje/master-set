BEGIN;

CREATE TABLE tcgs (
    tcg_id SERIAL PRIMARY KEY,
    tcg_desc TEXT DEFAULT NULL,
    tcg_name VARCHAR(255) NOT NULL,
    tcg_slug VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE sets (
    set_id SERIAL PRIMARY KEY,
    set_desc TEXT DEFAULT NULL,
    set_name VARCHAR(255) UNIQUE NOT NULL,
    set_slug VARCHAR(255) UNIQUE NOT NULL,
    tcg_id INTEGER,
    num_cards SMALLINT DEFAULT NULL,
    release_date VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (tcg_id) REFERENCES tcgs(tcg_id)
);

CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    card_image VARCHAR(255) DEFAULT NULL,
    card_name VARCHAR(255) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    card_slug VARCHAR(255) NOT NULL,
    set_id INTEGER,
    tcg_id INTEGER,
    -- TODO: HOW TO DO THIS?: has_first_edition BOOLEAN DEFAULT FALSE,
    release_date TIMESTAMPTZ DEFAULT NULL,
    artist VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (set_id) REFERENCES sets(set_id),
    FOREIGN KEY (tcg_id) REFERENCES tcgs(tcg_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULl,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOL NOT NULL DEFAULT FALSE,
    validation_token VARCHAR(255) DEFAULT NULL,
    validation_token_expiry TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE refresh_tokens (
    refresh_id SERIAL PRIMARY KEY,
    refresh_token_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
    -- REVOKE CURRENTLY NOT IMPLEMENTED -- Token is deleted??
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
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
