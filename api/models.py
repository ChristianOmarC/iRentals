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

class ReservationOut(ReservationIn): #LoanOut(LoanIn)
    id: str

class Reservation(ReservationIn): #Loan(LoanIn)
    id: PydanticObjectId
    account_id: str

class PropertyIn(BaseModel): #BookIn
    property_name: str

class Property(PropertyIn):#Book
    id: PydanticObjectId

class PropertyOut(PropertyIn): #BookOut(BookIn)
    id: str
    property_name: str
    account_id: str

class PropertyList(BaseModel):
    properties: List[PropertyOut]