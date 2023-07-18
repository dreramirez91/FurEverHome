from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries
from authenticator import authenticator


client = TestClient(app)


def test_account():
    return {"id": "101", "username": "test"}


class FakeDoggoQueries:
    def delete_dog(self, dog_id: int):
        return True


def test_delete_dog():
    app.dependency_overrides[DogQueries] = FakeDoggoQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = test_account

    res = client.delete("/api/dogs/1")
    data = res.json()

    assert res.status_code == 200
    assert {"success": True} == data
