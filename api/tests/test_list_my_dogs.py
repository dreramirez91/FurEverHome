from fastapi.testclient import TestClient
from main import app
from queries.dogs import DogQueries
from authenticator import authenticator


client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 214, "username": "fakerehomer"}


class FakeDogQueries:
    def list_my_dogs(self, rehomer_id: int):
        return [
            {
                "id": "3",
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
                "email": "jeremyh@example.com"
            }
        ]


def test_list_my_dogs():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    
    res = client.get("/dog/214")
    data = res.json()
    print(res, res.status_code, data)

    assert res.status_code == 200
    assert data == [
            {
                "id": "3",
                "name": "Enrique",
                "age": 2,
                "picture_url": "https://media.zenfs.com/en/pethelpful_915/d99bc960478076f15db41f586d52a2b9",
                "sex": "Male",
                "breed": "Mini Australian Shephard",
                "spayed_neutered": False,
                "adopted": False,
                "reason": "Moving out of state",
                "date_posted": "2023-07-13",
                "rehomer_id": 214,
                "address_city": "Sparta",
                "address_state": "TN",
                "email": "jeremyh@example.com"
            }
        ]