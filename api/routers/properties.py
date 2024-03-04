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
    return PropertyList(properties=repo.get_all())

@router.delete("/api/properties/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(property_id: str, repo: PropertiesRepo = Depends()):
    if not repo.delete_property(property_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return {"message": "Property deleted successfully"}