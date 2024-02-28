steps = [
    [
        # "Up" SQL statement for 'amenities' table
        """
        CREATE TABLE NOT EXISTS amenities (
        amenities_id SERIAL PRIMARY KEY,
        beer boolean   NOT NULL,
        air_conditioning boolean   NOT NULL,
        heat boolean   NOT NULL,
        laundry boolean   NOT NULL,
        parking boolean   NOT NULL,
        FOREIGN KEY(amenities_id) REFERENCES properties (amenities_id)
);

        """,
        # "Down" SQL statement
        """
        DROP TABLE IF EXISTS receipt;
        """
    ]
]
