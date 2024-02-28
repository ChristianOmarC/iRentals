from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token

class AccountIn(BaseModel):
    email: str
    first_name: str
    last_name: str
    username: str
    password: str

class AccountOut(BaseModel):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str

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

