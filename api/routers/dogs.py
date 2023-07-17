# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from typing import List, Dict
from pydantic import BaseModel

from queries.dogs import DogIn, DogOut, DogQueries, UpdateDogIn

router = APIRouter()


@router.post("/dogs/{rehomer_id}", response_model=DogOut)
async def create_dog(
    rehomer_id: int,
    dog: DogIn,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(dog, rehomer_id)


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


@router.get("/dog/{rehomer_id}", response_model=List[DogOut])
async def list_my_dogs(
    rehomer_id: int,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.list_my_dogs(rehomer_id)


@router.put("/dog/{dog_id}", response_model=DogOut)
async def update_dog(
    dog: UpdateDogIn,
    dog_id: int,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.update_dog(dog, dog_id)
