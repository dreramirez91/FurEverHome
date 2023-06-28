steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE dog (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            age SMALLINT NOT NULL,
            picture_url VARCHAR(1000) NOT NULL,
            sex VARCHAR(6) NOT NULL,
            breed VARCHAR(100) NOT NULL,
            spayed_neutered BOOL NOT NULL,
            adopted BOOL NOT NULL,
            reason TEXT NOT NULL,
            date_posted DATE DEFAULT NOW() NOT NULL,
            rehomer_id INT REFERENCES account(id) NOT NULL,
            address_city VARCHAR(100) NOT NULL,
            address_state VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE dog;
        """,
    ]
]
