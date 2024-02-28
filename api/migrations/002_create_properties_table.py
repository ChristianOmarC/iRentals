steps = [
    [

# "Up" SQL statement for 'properties' table
"""
CREATE TABLE IF NOT EXISTS properties (
    property_id SERIAL PRIMARY KEY,
    longitude varchar NULL,
    latitude varchar NULL,
    address varchar NOT NULL,
    city varchar NOT NULL,
    state varchar NOT NULL,
    zip integer NOT NULL,
    bedrooms integer NOT NULL,
    bathrooms float NOT NULL,
    price Numeric NOT NULL,
    description varchar NOT NULL,
    amenities_id integer NOT NULL,
    FOREIGN KEY(property_id) REFERENCES users (property_id)
);
""",
# "Down" SQL statement
"""
DROP TABLE properties
"""
    ]
]