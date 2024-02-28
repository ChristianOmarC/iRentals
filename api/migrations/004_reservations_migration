steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE NOT EXISTS reservations (
            reservation_id SERIAL PRIMARY KEY NOT NULL,
            checkin DATE NOT NULL,
            checkout DATE NOT NULL,
            user_id INTEGER NOT NULL,
            property_id INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(user_id),
            FOREIGN KEY(property_id) REFERENCES properties(property_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE IF EXISTS reservations;
        """
    ]
]
