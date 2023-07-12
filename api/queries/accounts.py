from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    username: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id,hashed_password, full_name
                    FROM account
                    WHERE username = %s
                    """,
                    (username,),
                )
                record = result.fetchone()
                print("RECORD", record)
                if record is None:
                    return None
                output = {}
                output["id"] = record[0]
                output["hashed_password"] = record[1]
                output["full_name"] = record[2]
                return AccountOutWithPassword(**output, username=username)

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        # ???
        if self.get(info.username) is not None:
            raise DuplicateAccountError
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO account
                        (username, hashed_password, full_name)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [info.username, hashed_password, info.full_name],
                )
                id = result.fetchone()[0]
                old_data = info.dict()
                old_data["hashed_password"] = hashed_password
                return AccountOutWithPassword(id=id, **old_data)
