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
    rehomer_id: int
    address_city: str
    address_state: str


class DogQueries:
    datenow = date.today()
    def create(self, dog: DogIn, rehomer_id: int) -> DogOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO dog
                        (name, age, picture_url, sex, breed, spayed_neutered, adopted, reason, address_city, address_state, rehomer_id, date_posted)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        rehomer_id,
                        self.datenow
                    ],
                )
                id = result.fetchone()[0]
                return self.dog_in_to_out(id, dog, rehomer_id)

    def dog_in_to_out(self, id: int, dog: DogIn, rehomer_id: int):
        old_data = dog.dict()
        return DogOut(id=id, date_posted=self.datenow, rehomer_id=rehomer_id, **old_data)
