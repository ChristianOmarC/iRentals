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
from models import PropertyOut, PropertyIn, PropertyList
from authenticator import authenticator
from typing import List

router = APIRouter()

@router.post('/api/properties', response_model=PropertyOut)
def create_property(
    property_in: PropertyIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: PropertiesRepo = Depends()
):
    return queries.create(property=property_in, account_id=account_data['id'])

@router.get("/api/properties", response_model = PropertyList)
def list_property(repo: PropertiesRepo = Depends()):
    return repo.get_all()

@router.get("/api/properties/own", response_model = PropertyList)
def list_properties_for_account(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PropertiesRepo = Depends()
    ):
    return repo.get_all_for_account(account_id=account_data['id'])
