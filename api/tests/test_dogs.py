from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries
from typing import Dict


client = TestClient(app)


class FakeDogQueries:
    def list_all_dogs(self) -> Dict:
        return []


def test_list_all_dogs():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    res = client.get("/dogs")
    data = res.json()

    assert len(data) == 0

    assert res.status_code == 200
