from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from queries.properties import PropertiesRepo
from models import PropertyOut, PropertyIn
from authenticator import authenticator

router = APIRouter()

@router.post('/api/properties', response_model=PropertyOut)
async def create_property(
    property: PropertyIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: PropertiesRepo = Depends()
):
    return queries.create(property=PropertyIn)

@router.get("/api/properties/{properties_id}", response_model = PropertiesRepo)
def get_property(
    repo: PropertiesRepo = Depends()

):
    return PropertiesRepo(properties=repo.get_all())
