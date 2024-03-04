from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from models import ReservationIn, ReservationOut
from .client import MongoQueries

class ReservationsRepo(MongoQueries):
    collection_name = "reservations"

    def create(self, reservation: ReservationIn, account_id: str) -> ReservationOut:
        reservation_dict = reservation.dict()
        reservation_dict['account_id'] = account_id
        result = self.collection.insert_one(reservation_dict)
        reservation_dict["id"] = str(result.inserted_id)
        del reservation_dict["_id"]
        return ReservationOut(**reservation_dict)
