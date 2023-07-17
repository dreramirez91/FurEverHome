from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries

# PYTHON -M PYTEST IN FASTAPI TERMINAL TO RUN THE TEST

client = TestClient(app)
# TestClient pretends as if FastAPI is up and running but it doesn't actually have to be to hit it


class FakeDogQueries:
    def create(self, dog, rehomer_id):
        return {
            "id": "46",
            "name": "string",
            "age": 0,
            "picture_url": "string",
            "sex": "string",
            "breed": "string",
            "spayed_neutered": true,
            "adopted": true,
            "reason": "string",
            "date_posted": "2023-07-17",
            "rehomer_id": 1,
            "address_city": "string",
            "address_state": "string",
            "email": "string",
        }


def test_create_dog():
    # ARRANGE
    app.dependency_overrides[DogQueries] = FakeDogQueries
    res = client.post("/dogs/{rehomer_id}")
    data = res.json()
    print(res, res.status_code)
    # sample_dog = {
    #     "name": "string",
    #     "age": 0,
    #     "picture_url": "string",
    #     "sex": "string",
    #     "breed": "string",
    #     "spayed_neutered": true,
    #     "adopted": true,
    #     "reason": "string",
    #     "address_city": "string",
    #     "address_state": "string",
    #     "email": "string",
    # }

    # ACT

    # ASSERT
    assert res.status_code == 200
    assert data == {
        "id": "46",
        "name": "string",
        "age": 0,
        "picture_url": "string",
        "sex": "string",
        "breed": "string",
        "spayed_neutered": true,
        "adopted": true,
        "reason": "string",
        "date_posted": "2023-07-17",
        "rehomer_id": 1,
        "address_city": "string",
        "address_state": "string",
        "email": "string",
    }
