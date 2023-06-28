from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class DogIn(BaseModel):
    name: str
    age: int
    picture_url: str
    sex: str
    breed: str
    spayed_neutered: bool
    adopted: bool
    reason: str
    address_city: str
    address_state: str


class DogOut(BaseModel):
    id: str
    name: str
    age: int
    picture_url: str
    sex: str
    breed: str
    spayed_neutered: bool
    adopted: bool
    reason: str
    date_posted: date
    address_city: str
    address_state: str


class DogQueries:
    def create(self, dog: DogIn) -> DogOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO dog
                        (name, age, picture_url, sex, breed, spayed_neutered, adopted, reason, address_city, address_state, rehomer_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, SELECT id FROM account WHERE dog.rehomer_id = account.id )
                    RETURNING id;
                    """,
                    [
                        dog.name,
                        dog.age,
                        dog.picture_url,
                        dog.sex,
                        dog.breed,
                        dog.spayed_neutered,
                        dog.adopted,
                        dog.reason,
                        dog.address_city,
                        dog.address_state,
                    ],
                )
                print(result.fetchone())
                id = result.fetchone()[0]
                # do we need rehomer_id in 41? rehomer_id = ??? or does it automatically populate? | SQL doesn't know the logged in user is the account? Need to go back to auth lecture
                return self.dog_in_to_out(id, dog)

    def dog_in_to_out(self, id: int, dog: DogIn):
        old_data = dog.dict()
        return DogOut(id=id, **old_data)
