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


from pydantic import BaseModel

from queries.dogs import (
    DogIn,
    DogOut,
    DogQueries,
)

router = APIRouter()


@router.post("/api/dogs/{owner_id}", response_model=DogOut)
async def create_dog(
    dog: DogIn,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(dog)
