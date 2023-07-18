# router.py
from fastapi import (
    Depends,
    APIRouter,
)
from authenticator import authenticator

from typing import List, Dict


from queries.dogs import DogIn, DogOut, DogQueries, UpdateDogIn

router = APIRouter()


@router.post("/dogs/", response_model=DogOut)
async def create_dog(
    dog: DogIn,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    print("ACCOUNT DATA ----->", account_data)
    return repo.create(dog, rehomer_id=account_data["id"])


@router.get("/dogs", response_model=Dict)
async def list_all_dogs(
    repo: DogQueries = Depends(),
):
    return repo.list_all_dogs()


@router.delete("/dog/{dog_id}")
async def delete_dog(
    dog_id: int,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete_dog(dog_id)


@router.get("/dog/", response_model=List[DogOut])
async def list_my_dogs(
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.list_my_dogs(rehomer_id=account_data["id"])


@router.put("/dog/{dog_id}", response_model=DogOut)
async def update_dog(
    dog: UpdateDogIn,
    dog_id: int,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.update_dog(dog, dog_id)
