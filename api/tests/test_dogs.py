from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries, DogIn
from authenticator import authenticator
from datetime import datetime, date
from typing import Dict

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "1", "username": "fakeuser", "full_name": "fake guy"}


class FakeDogQueries:
    def create(self, dog_in: DogIn, rehomer_id: int):
        dog = dog_in.dict()
        dog["id"] = "fake_id_from_db"
        dog["rehomer_id"] = rehomer_id
        datetime_str = "09/19/22"
        datetime_object = datetime.strptime(datetime_str, "%m/%d/%y")
        dog["date_posted"] = datetime_object
        return dog

    def list_all_dogs(self) -> Dict:
        return {
            "dogs": [
                {
                    "id": "3",
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
        "id": "fake_id_from_db",
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


def test_list_all_dogs():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    res = client.get("/dogs")
    data = res.json()

    assert data == {
        "dogs": [
            {
                "id": "3",
                "name": "Mongo",
                "age": 1,
                "picture_url": "https://pittiemerescue.org/uploads/3/4/5/0/34503852/img-9276_orig.jpeg",
                "sex": "female",
                "breed": "mix",
                "spayed_neutered": True,
                "adopted": False,
                "reason": "la la la",
                "date_posted": "2023-07-13",
                "rehomer_id": 1,
                "address_city": "austin",
                "address_state": "tx",
                "email": "boo@gmail.com",
            }
        ]
    }

    assert res.status_code == 200


def test_delete_dog():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    res = client.delete("/dog/12")
    data = res.json()

    assert res.status_code == 200
    assert {"success": True} == {"success": data}
