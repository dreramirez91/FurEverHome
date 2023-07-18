from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries, UpdateDogIn
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 1,
        'username': 'string',
        'full_name': 'string'
    }


class FakeDogQueries:
    def update_dog(self, dog: UpdateDogIn, dog_id: int,):
        result = {
            "id": "1",
            "name": "Apple",
            "age": 0,
            "picture_url": "string",
            "sex": "Male",
            "breed": "Dog",
            "spayed_neutered": True,
            "adopted": True,
            "reason": "string",
            "date_posted": "2023-07-18",
            "rehomer_id": 1,
            "address_city": "string",
            "address_state": "string",
            "email": "string"
        }
        result.update(dog)
        return result


def test_update_dog():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    json = {
        "age": 22,
        "picture_url": "string",
        "spayed_neutered": True,
        "adopted": True,
        "reason": "string",
        "address_city": "string",
        "address_state": "string",
        "email": "string"
    }
    expected = {
        "id": "1",
        "name": "Apple",
        "age": 22,
        "picture_url": "string",
        "sex": "Male",
        "breed": "Dog",
        "spayed_neutered": True,
        "adopted": True,
        "reason": "string",
        "date_posted": "2023-07-18",
        "rehomer_id": 1,
        "address_city": "string",
        "address_state": "string",
        "email": "string"
    }

    res = client.put(
        "/dog/1",
        json=json
    )
    data = res.json()

    assert res.status_code == 200
    assert data == expected
