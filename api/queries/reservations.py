from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from models import ReservationIn, ReservationOut
from .client import MongoQueries

class ReservationsRepo(MongoQueries):
    collection_name = "reservations"

    def create(self, reservation: ReservationIn, guest_id: str) -> ReservationOut:
        reservation_dict = reservation.dict()
        reservation_dict['account_id'] = guest_id

        result = self.collection.insert_one(reservation_dict)
        reservation_dict["id"] = str(result.inserted_id)
        return ReservationOut(**reservation_dict)

    def update(self, reservation_id: str, reservation_update: ReservationIn) -> ReservationOut | None:
        try:
            self.collection.update_one(
                {'_id': ObjectId(reservation_id)},
                {'$set': reservation_update.dict(exclude_unset=True)}
            )
            return self.get_one(reservation_id)
        except InvalidId:
            return None

    def get_all(self, guest_id: str) -> list[ReservationOut]:
        res = []
        for reservation in self.collection.find({'account_id': guest_id}):
            reservation['id'] = str(reservation['_id'])
            del reservation["_id"]
            res.append(ReservationOut(**reservation))
        return res

    def get_one(self, reservation_id: str) -> ReservationOut | None:
        try:
            reservation = self.collection.find_one({'_id': ObjectId(reservation_id)})
            if reservation:
                reservation['id'] = str(reservation['_id'])
                del reservation["_id"]
                return ReservationOut(**reservation)
        except InvalidId:
            return None

    def delete_reservation(self, reservation_id: str) -> bool:
        result = self.collection.delete_one({"_id": ObjectId(reservation_id)})
        return result.deleted_count > 0
