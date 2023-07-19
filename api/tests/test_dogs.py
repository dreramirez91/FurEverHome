from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries, DogIn, UpdateDogIn
from authenticator import authenticator
from datetime import datetime

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 1, "username": "fakeuser", "full_name": "fake guy"}


class FakeDogQueries:
    def create(self, dog_in: DogIn, rehomer_id: int):
        dog = dog_in.dict()
        dog["id"] = 1
        dog["rehomer_id"] = rehomer_id
        datetime_str = "09/19/22"
        datetime_object = datetime.strptime(datetime_str, "%m/%d/%y")
        dog["date_posted"] = date(2023, 7, 13)
        return dog

    def list_all_dogs(self) -> Dict:
        return {
            "dogs": [
                {
                    "id": 3,
                    "name": "Mongo",
                    "age": 1,
                    "picture_url": "https://pittiemerescue.org/uploads/3/4/5/0/34503852/img-9276_orig.jpeg",
                    "sex": "female",
                    "breed": "mix",
                    "spayed_neutered": True,
                    "adopted": False,
                    "reason": "la la la",
                    "date_posted": date(2023, 7, 13),
                    "rehomer_id": 1,
                    "address_city": "austin",
                    "address_state": "tx",
                    "email": "boo@gmail.com",
                }
            ]
        }

    def delete_dog(self, dog_id: int, rehomer_id: int):
        return True

    def update_dog(self, dog: UpdateDogIn, dog_id: int, rehomer_id: int):
        result = {
            "id": 1,
            "name": "Apple",
            "age": 0,
            "picture_url": "string",
            "sex": "Male",
            "breed": "Dog",
            "spayed_neutered": True,
            "adopted": True,
            "reason": "string",
            "date_posted": "2023-07-18",
            "rehomer_id": rehomer_id,
            "address_city": "string",
            "address_state": "string",
            "email": "string",
        }
        result.update(dog)
        return result

    def list_my_dogs(self, rehomer_id: int):
        return [
            {
                "id": 3,
                "name": "Enrique",
                "age": 2,
                "picture_url": "https://media.zenfs.com/en/pethelpful_915/d99bc960478076f15db41f586d52a2b9",
                "sex": "Male",
                "breed": "Mini Australian Shephard",
                "spayed_neutered": False,
                "adopted": False,
                "reason": "Moving out of state",
                "date_posted": "2023-07-13",
                "rehomer_id": rehomer_id,
                "address_city": "Sparta",
                "address_state": "TN",
                "email": "jeremyh@example.com",
            }
        ]


def test_create_dog():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    dog_in = {
        "name": "string",
        "age": 0,
        "picture_url": "string",
        "sex": "string",
        "breed": "string",
        "spayed_neutered": True,
        "adopted": True,
        "reason": "string",
        "address_city": "string",
        "address_state": "string",
        "email": "string",
    }
    res = client.post("/dogs/", json=dog_in)
    data = res.json()
    print(res, res.status_code)
    assert res.status_code == 200
    assert data == {
        "id": 1,
        "name": "string",
        "age": 0,
        "picture_url": "string",
        "sex": "string",
        "breed": "string",
        "spayed_neutered": True,
        "adopted": True,
        "reason": "string",
        "date_posted": "2022-09-19",
        "rehomer_id": 1,
        "address_city": "string",
        "address_state": "string",
        "email": "string",
    }
