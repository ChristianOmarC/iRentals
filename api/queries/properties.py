from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from models import PropertyIn, PropertyOut
from .client import MongoQueries

class PropertiesRepo(MongoQueries):
    collection_name = "properties"

    def create(self, property : PropertyIn, account_id: str):
        property_dict = property.dict()
        property_dict['account_id'] = account_id
        self.collection.insert_one(property_dict)
        property_dict["id"] = str(property_dict["_id"])

        return property_dict

    def get_all(self):
        res = []
        for property in self.collection.find():
            property['id'] = str(property['_id'])
            res.append(property)
        return res

    def get_all_for_account(self, account_id: str):
        res = []
        for property in self.collection.find({'account_id': account_id}):
            property['id'] = str(property['_id'])
            res.append(property)
        return res

    def get_one(self, property_id: str):
        try:
            property = self.collection.find_one({'_id': ObjectId(property_id)})
        except InvalidId:
            property = None
        if property is not None:
            property['id'] = str(property['_id'])
        return property
# class PropertiesRepo:
    # def __init__(self, db):
    #     self.db = db
    #     self.collection = self.db.properties  

    def update(self, property_id: str, property_update: PropertyIn) -> PropertyOut | None:
        try:
            update_result = self.collection.update_one(
                {'_id': ObjectId(property_id)},
                {'$set': property_update.dict(exclude_unset=True)}
            )
            if update_result.modified_count:
                return self.get_one(property_id)
        except InvalidId:
            return None
    def delete_property(self, property_id: str) -> bool:
        result = self.collection.delete_one({"_id": ObjectId(property_id)})
        return result.deleted_count > 0

