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


@router.post("/dogs/{rehomer_id}", response_model=DogOut)
async def create_dog(
    rehomer_id: int,
    dog: DogIn,
    repo: DogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(dog, rehomer_id)
