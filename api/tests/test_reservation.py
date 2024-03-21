from models import PydanticObjectId, ReservationIn, ReservationList, ReservationOut
from fastapi.testclient import TestClient
from queries.reservations import ReservationsRepo
from authenticator import authenticator
from main import app
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List

client = TestClient(app=app)



def fake_current_account():
    return {"id": "65eb3f6ee3b05dcfaea1c43a",
            "email": "Billy@email.com",
            "first_name": "Billy",
            "last_name": "Bob",
            "username": "BillyBob",
           }


class FakeReservationRepo:
    def __init__(self):
            self.reservations = []
    def get_all(self, guest_id: str) -> List[dict]:
        return ReservationList(reservations=[])
    def create(self, reservation: ReservationIn, guest_id: str) -> ReservationOut:
            reservation_id = str(len(self.reservations) + 1)

            new_reservation = ReservationOut(
                id=reservation_id,
                checkin=reservation.checkin,
                checkout=reservation.checkout,
                reservation_name=reservation.reservation_name,
                property_id=reservation.property_id,
                account_id=guest_id
            )

            self.reservations.append(new_reservation)

            return new_reservation
    def update(self, reservation_id: str, updated_reservation: ReservationIn) -> ReservationOut:
            for reservation in self.reservations:
                if reservation.id == reservation_id:
                    reservation.checkin = updated_reservation.checkin
                    reservation.checkout = updated_reservation.checkout
                    reservation.reservation_name = updated_reservation.reservation_name
                    reservation.property_id = updated_reservation.property_id
                    return reservation

    def delete_reservation(self, reservation_id: str) -> bool:
        for reservation in self.reservations:
            if reservation.id == reservation_id:
                self.reservations.remove(reservation)
                return True
        return False


# def test_list_reservations():
#     app.dependency_overrides[authenticator.get_current_account_data] = fake_current_account
#     app.dependency_overrides[ReservationsRepo] = lambda: FakeReservationRepo()
#     res = client.get("/api/reservations")

#     #assert res.status_code ==200
#     assert res.json() == { "reservations": []}

# def test_create_reservation():
#     app.dependency_overrides[authenticator.get_current_account_data] = fake_current_account


#     reservation_data = {
#         "checkin": "2023-12-24",
#         "checkout": "2023-12-31",
#         "reservation_name": "Holiday Stay",
#         "property_id": "65eb3f6ee3b05dcfaea1c43a",
#         "account_id": "65eb3f6ee3b05dcfaea1c43a",
#     }
#     res = client.post("/api/reservations", json=reservation_data)

#     app.dependency_overrides = {}
#     #assert res.status_code == 200
#     assert res.json()["checkin"] == reservation_data["checkin"]
#     assert res.json()["checkout"] == reservation_data["checkout"]
#     assert res.json()["reservation_name"] == reservation_data["reservation_name"]
#     assert res.json()["property_id"] == reservation_data["property_id"]
#     assert res.json()["account_id"] == reservation_data["account_id"]
#     assert "id" in res.json()

# def test_update_reservation():

#     app.dependency_overrides[authenticator.get_current_account_data] = fake_current_account
#     app.dependency_overrides[ReservationsRepo] = lambda: FakeReservationRepo()
#     reservation_id = "65eb3f6ee3b05dcfaea1c43a"

#     reservation_data = {
#         "checkin": "2023-12-24",
#         "checkout": "2023-12-31",
#         "reservation_name": "Holiday Stay",
#         "property_id": "65eb3f6ee3b05dcfaea1c43a",
#         "account_id": "65eb3f6ee3b05dcfaea1c43a",
# "        id": "65eb3f6ee3b05dcfaea1c43a"

#     }
#     #create_res = client.put(f"/api/reservations/{id}", json=reservation_data)
#     #created_reservation_id = create_res.json()["id"]


#     updated_reservation_data = {
#         "checkin": "2023-12-25",
#         "checkout": "2023-12-31",
#         "reservation_name": "Updated Stay",
#         "property_id": "65eb3f6ee3b05dcfaea1c43a",
#         "account_id": "65eb3f6ee3b05dcfaea1c43a",
#         "id": "65eb3f6ee3b05dcfaea1c43a"
#     }


#     update_res = client.put(f"/api/reservations/{reservation_id}", json=updated_reservation_data)

#     app.dependency_overrides = {}

#     assert update_res.status_code == 200
#     assert update_res.json()["checkin"] == updated_reservation_data["checkin"]
#     assert update_res.json()["checkout"] == updated_reservation_data["checkout"]
#     assert update_res.json()["reservation_name"] == updated_reservation_data["reservation_name"]
#     assert update_res.json()["property_id"] == updated_reservation_data["property_id"]
#     assert update_res.json()["account_id"] == updated_reservation_data["account_id"]
#     assert "id" in update_res.json()


#Delete
def test_delete_reservation():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_current_account
    app.dependency_overrides[ReservationsRepo] = lambda: FakeReservationRepo()
    reservation_id = "65eb3f6ee3b05dcfaea1c43a"

    delete_res = client.delete(f"/api/reservations/{reservation_id}")

    assert delete_res.status_code == 204
