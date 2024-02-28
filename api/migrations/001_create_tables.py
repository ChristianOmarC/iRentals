steps = [
    [

# "Up" SQL statement for tables
"""
CREATE TABLE IF NOT EXISTS amenities (
    amenities_id SERIAL PRIMARY KEY,
    beer BOOLEAN NOT NULL,
    air_conditioning BOOLEAN NOT NULL,
    heat BOOLEAN NOT NULL,
    laundry BOOLEAN NOT NULL,
    parking BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL UNIQUE,
    hashed_password VARCHAR NOT NULL,
    phone_number(15) VARCHAR NOT NULL,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(25) NOT NULL,
    zip VARCHAR(15) NOT NULL,
    bio VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS properties (
    property_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    longitude FLOAT NULL,
    latitude FLOAT NULL,
    address VARCHAR(100)  NOT NULL,
    city VARCHAR(50)  NOT NULL,
    state VARCHAR(25) NOT NULL,
    zip VARCHAR(15) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms FLOAT NOT NULL,
    price NUMERIC NOT NULL,
    description VARCHAR(1000) NOT NULL,
    amenities_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (amenities_id) REFERENCES amenities (amenities_id)
);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    user_id INTEGER NOT NULL,
    property_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (property_id) REFERENCES properties (property_id)
);
""",
# "Down" SQL statement
"""
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS amenities;
"""
    ]
]