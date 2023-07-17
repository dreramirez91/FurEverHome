from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries
from datetime import date
from typing import Dict


client = TestClient(app)


class FakeDogQueries:
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
