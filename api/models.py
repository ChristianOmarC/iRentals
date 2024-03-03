from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import Optional, List
from bson import ObjectId

class AccountIn(BaseModel):
    email: str
    first_name: str
    last_name: str
    username: str
    password: str

class AccountOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    username: str

class Account(AccountOut):
    hashed_password: str

class DeleteStatus(BaseModel):
    success: bool

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    hashed_password: str
    phone_number: str
    address: str
    city: str
    state: str
    zip: int
    bio: str

class PropertyBase(BaseModel):
    longitude: Optional[str] = None
    latitude: Optional[str] = None
    address: str
    city: str
    state: str
    zip: int
    bedrooms: int
    bathrooms: float
    price: float
    description: str
    amenities: dict

class ReservationBase(BaseModel):
    checkin: str
    checkout: str
    user_id: PyObjectId
    property_id: PyObjectId