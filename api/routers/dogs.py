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

from queries.accounts import (
    DogIn,
    DogOut,
    DogQueries,
)


@router.post("/api/{owner_id}/dogs", response_model=DogOut)
async def create_dog(
    dog: DogIn,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return DogQueries.create(dog)
