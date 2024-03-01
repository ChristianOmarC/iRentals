import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from models import AccountIn

client = MongoClient(os.environ.get("DATABASE_URL", ""))
db = client["mongo-data"]

class DuplicateAccountError(ValueError):
    pass

class AccountRepo:
    @property
    def collection(self):
        return db["accounts"]
    def create(self, info: AccountIn, hashed_password: str):
        if self.get(username=info.username) is not None:
            raise DuplicateAccountError

    def get(self, username: str):
        pass
