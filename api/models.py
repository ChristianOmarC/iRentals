from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from bson.objectid import ObjectId
from typing import List


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except Exception as e:
                raise ValueError(f"Not a valid object id: {value}") from e
        return value


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


class ReservationIn(BaseModel):
    checkin: str
    checkout: str
    reservation_name: str
    property_id: str
    account_id: str


class ReservationOut(ReservationIn):
    id: str
    reservation_name: str


class Reservation(ReservationIn):
    id: PydanticObjectId
    guest_id: str


class ReservationList(BaseModel):
    reservations: List[ReservationOut]


class Amenities(BaseModel):
    ac: bool
    heating: bool
    washer_dryer: bool
    parking: bool
    beer: bool
    wifi: bool
    pets_allowed: bool
    pool: bool


class Address(BaseModel):
    address: str
    city: str
    state: str
    zip: str


class PropertyIn(BaseModel):
    name: str
    address: Address
    bedrooms: int
    bathrooms: float
    price: float
    description: str
    amenities: Amenities
    image: str


class Property(PropertyIn):
    id: PydanticObjectId
    rating: float = 0.0


class PropertyOut(PropertyIn):
    id: str
    account_id: str
    rating: float = 0.0


class PropertyList(BaseModel):
    properties: List[PropertyOut]
