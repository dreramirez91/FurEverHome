from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from typing import List, Dict


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
    email: str


class DogOut(BaseModel):
    id: int
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
    email: str


class UpdateDogIn(BaseModel):
    age: int
    picture_url: str
    spayed_neutered: bool
    adopted: bool
    reason: str
    address_city: str
    address_state: str
    email: str


class DogQueries:
    datenow = date.today()

    def create(self, dog: DogIn, rehomer_id: int) -> DogOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO dog
                        (
                        name,
                        age,
                        picture_url,
                        sex,
                        breed,
                        spayed_neutered,
                        adopted,
                        reason,
                        address_city,
                        address_state,
                        rehomer_id,
                        date_posted,
                        email
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        self.datenow,
                        dog.email,
                    ],
                )
                id = result.fetchone()[0]
                return self.dog_in_to_out(id, dog, rehomer_id)

    def list_all_dogs(self) -> Dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                        id,
                        name,
                        age,
                        picture_url,
                        sex,
                        breed,
                        spayed_neutered,
                        adopted,
                        date_posted,
                        rehomer_id,
                        address_city,
                        address_state,
                        reason,
                        email
                    FROM dog
                    WHERE adopted = false
                    ORDER BY date_posted;
                    """
                )
                result = []
                for record in db:
                    dog = DogOut(
                        id=record[0],
                        name=record[1],
                        age=record[2],
                        picture_url=record[3],
                        sex=record[4],
                        breed=record[5],
                        spayed_neutered=record[6],
                        adopted=record[7],
                        date_posted=record[8],
                        rehomer_id=record[9],
                        address_city=record[10],
                        address_state=record[11],
                        reason=record[12],
                        email=record[13],
                    )
                    result.append(dog)
                output = {}
                output["dogs"] = result
                return output

    def list_my_dogs(self, rehomer_id: int) -> List[DogOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    id,
                    name,
                    age,
                    picture_url,
                    sex,
                    breed,
                    spayed_neutered,
                    adopted,
                    date_posted,
                    rehomer_id,
                    address_city,
                    address_state,
                    reason,
                    email
                    FROM dog
                    WHERE rehomer_id = %s
                    ORDER BY date_posted;
                    """,
                    [rehomer_id],
                )
                result = []
                for record in db:
                    dog = DogOut(
                        id=record[0],
                        name=record[1],
                        age=record[2],
                        picture_url=record[3],
                        sex=record[4],
                        breed=record[5],
                        spayed_neutered=record[6],
                        adopted=record[7],
                        date_posted=record[8],
                        rehomer_id=rehomer_id,
                        address_city=record[10],
                        address_state=record[11],
                        reason=record[12],
                        email=record[13],
                    )
                    result.append(dog)
                return result

    def delete_dog(self, dog_id: int, rehomer_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM dog
                    WHERE id = %s AND rehomer_id = %s
                    """,
                    [dog_id, rehomer_id],
                )
                return True

    def update_dog(self, dog: UpdateDogIn, dog_id: int, rehomer_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                print(db.description)
                result = db.execute(
                    """
                    UPDATE dog
                    SET age = %s,
                    picture_url = %s,
                    spayed_neutered = %s,
                    adopted = %s,
                    reason = %s,
                    address_city = %s,
                    address_state = %s,
                    email = %s
                    WHERE id = %s AND rehomer_id = %s
                    RETURNING rehomer_id,name,breed,sex;
                    """,
                    [
                        dog.age,
                        dog.picture_url,
                        dog.spayed_neutered,
                        dog.adopted,
                        dog.reason,
                        dog.address_city,
                        dog.address_state,
                        dog.email,
                        dog_id,
                        rehomer_id,
                    ],
                )
                id = dog_id
                more_old_data = result.fetchone()
                rehomer_id = more_old_data[0]
                name = more_old_data[1]
                breed = more_old_data[2]
                sex = more_old_data[3]
                return self.update_dog_in_to_out(
                    id, dog, rehomer_id, name, breed, sex
                )

    def update_dog_in_to_out(
        self,
        id: int,
        dog: UpdateDogIn,
        rehomer_id: int,
        name: str,
        breed: str,
        sex: str,
    ):
        old_data = dog.dict()
        return DogOut(
            id=id,
            date_posted=self.datenow,
            rehomer_id=rehomer_id,
            name=name,
            breed=breed,
            sex=sex,
            **old_data
        )

    def dog_in_to_out(self, id: int, dog: DogIn, rehomer_id: int):
        old_data = dog.dict()
        return DogOut(
            id=id, date_posted=self.datenow, rehomer_id=rehomer_id, **old_data
        )
