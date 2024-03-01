from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from models import PropertyIn, PropertyOut
from .client import MongoQueries

class PropertiesRepo(MongoQueries):
    collection_name = "properties"

    def get_all(self):
        res = []
        for property in self.collection.find():
            property['id'] =str(property['_id'])
            res.append(property)
        return res

    def create(self, property : PropertyIn) -> PropertyOut:
        props = property.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return PropertyOut(reservations=[], **props)

    def get_one(self, id: int):
        property = self.collection.find_one({'_id': ObjectId(property_id)})
        if property is not None:
            property['id'] = str(property['_id'])
        return property


    
