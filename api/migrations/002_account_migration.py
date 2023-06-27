steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(100) NOT NULL,
            hashed_password VARCHAR(100) NOT NULL,
            full_name VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE account;
        """
    ]
]
