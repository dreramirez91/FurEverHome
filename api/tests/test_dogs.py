from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries, DogIn
from authenticator import authenticator
from datetime import datetime

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "1337", "username": "fakeuser", "full_name": "fake guy"}


class FakeDogQueries:
    def create(self, dog_in: DogIn, rehomer_id: int):
        dog = dog_in.dict()
        dog["id"] = "fake_id_from_db"
        dog["rehomer_id"] = rehomer_id
        datetime_str = "09/19/22"
        datetime_object = datetime.strptime(datetime_str, "%m/%d/%y")
        dog["date_posted"] = datetime_object
        return dog


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
    res = client.post("/dogs/1", json=dog_in)
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
