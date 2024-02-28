from models import AccountIn
from pydantic import BaseModel
from starlette import status

class DuplicateAccountError(ValueError):
    pass


class AccountRepo:
    
    def create(self, info: AccountIn, hashed_password: str):
        if self.get(username=info.username) is not None:
            raise DuplicateAccountError

    def get(self, username: str):
        pass


class CreateUserRequest(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    password: str


# @router.post("/",  status_code=status.HTTP_201_CREATED)
# async def create_user( create_user_request: CreateUserRequest):
#     create_user_model = Users()