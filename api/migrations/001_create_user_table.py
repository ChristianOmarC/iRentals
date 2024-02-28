steps = [
    [
        # "Up" SQL statement
        """
    CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    hashed_password varchar NOT NULL,
    phone_number varchar NOT NULL,
    address varchar NOT NULL,
    city varchar NOT NULL,
    state varchar NOT NULL,
    zip integer NOT NULL,
    bio varchar NOT NULL,
    property_id INTEGER NOT NULL,
    FOREIGN KEY(property_id) REFERENCES properties (property_id)
);
        """,
        # "Down" SQL statement
        """
        DROP TABLE IF EXISTS users;  
        """
    ],

]