from pydantic import BaseModel


class AccountIN(BaseModel):
    username: str
    password: str

class AccountOut(BaseModel):
    id: str
    username: str
    fav_food

class Account(AccountOut):
    hashed_password: str

class DeleteStatus(BaseModel):
    success: bool

class AccountToken(Token):
    pass
