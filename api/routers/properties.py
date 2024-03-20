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

@router.post("/api/properties", response_model=PropertyOut)
def create_property(
    property_in: PropertyIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: PropertiesRepo = Depends()
):
    new_property = queries.create(property=property_in, account_id=account_data['id'])

    if not new_property:
        raise HTTPException(status_code=400, detail="Error creating property.")

    return new_property

@router.get("/api/properties", response_model = PropertyList)
def get_all_properties(repo: PropertiesRepo = Depends()):
    return PropertyList(properties=repo.get_all())

@router.get("/api/properties/own", response_model = PropertyList)
def get_properties_for_account(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PropertiesRepo = Depends()
    ):
    return PropertyList(properties=repo.get_all_for_account(account_id=account_data['id']))


@router.put("/api/properties/{property_id}", response_model=PropertyOut)
def update_property(

    property_id: str,
    property_update: PropertyIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    properties_repo: PropertiesRepo = Depends()
):
    print(property_id)
    updated_property = properties_repo.update(account_data['id'], property_id, property_update,)
    if updated_property:
        return PropertyOut(**updated_property)
    else:
        raise HTTPException(status_code=404, detail="Property not found.")

@router.delete("/api/properties/{property_id}", status_code=status.HTTP_200_OK)
def delete_property(property_id: str, repo: PropertiesRepo = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    if not repo.delete_property(property_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return {"message": "Property deleted successfully"}

@router.get("/api/properties/{property_id}", response_model=PropertyOut)
def get_property(property_id: str, repo: PropertiesRepo = Depends()):
    property = repo.get_one(property_id)
    if property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return property
