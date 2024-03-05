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
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value

class AccountIn(BaseModel):
    email: str
    first_name: str
    last_name: str
    username: str
    password: str #dont touch

class AccountOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    username: str

class Account(AccountOut):
    hashed_password: str  #dont touch

class DeleteStatus(BaseModel):
    success: bool

class AccountForm(BaseModel):  #dont touch
    username: str
    password: str

class AccountToken(Token):  #dont touch
    account: AccountOut

class HttpError(BaseModel):
    detail: str

class ReservationIn(BaseModel):#LoanIn
    checkin: str
    checkout: str
    reservation_name: str
    property_id: str    #?
    account_id: str #updated for account_id

class ReservationOut(ReservationIn): #LoanOut(LoanIn)
    id: str
    reservation_name: str #updated for reservation_name
    property_id: str    #update for property_id
    account_id: str #updated for account_id

class Reservation(ReservationIn): #Loan(LoanIn)
    id: PydanticObjectId
    account_id: str

class ReservationList(BaseModel):
    reservations : List[ReservationOut]

class Amenities(BaseModel):
    AC: bool
    Heating: bool
    Washer_Dryer: bool
    Parking: bool
    Beer: bool
    Wifi: bool
    Pets_allowed: bool
    Pool: bool

class PropertyIn(BaseModel):
    property_name: str
    address: str
    city: str
    state: str
    zip: str
    bedrooms: int
    bathrooms: float
    price: float
    description: str
    amenities: Amenities

class Property(PropertyIn):#Book
    id: PydanticObjectId

class PropertyOut(PropertyIn): #BookOut(BookIn)
    id: str
    account_id: str

class PropertyList(BaseModel):
    properties: List[PropertyOut]


