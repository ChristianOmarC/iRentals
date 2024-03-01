from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from models import AccountIn, Account
from .client import MongoQueries



class DuplicateAccountError(ValueError):
    pass

class AccountRepo(MongoQueries):
    collection_name = "accounts"
    # @property
    # def collection(self):
    #     return db["accounts"]


    def create(self, info: AccountIn, hashed_password: str):
        if self.get(username=info.username) is not None:
            raise DuplicateAccountError
        account = info.dict()
        account['hashed_password'] = hashed_password
        del account['password']
        self.collection.insert_one(account)
        account['id'] = str(account['_id'])
        return Account(**account)

    def get(self, username: str):
        account = self.collection.find_one({'username': username})
        if account is not None:
            account['id'] = str(account['_id'])
            return Account(**account)
        return account
