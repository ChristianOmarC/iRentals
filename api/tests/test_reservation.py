from models import PydanticObjectId, ReservationIn, ReservationList, ReservationOut
from fastapi.testclient import TestClient
from queries.reservations import ReservationsRepo
from pydantic import BaseModel
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
    def get_all(self, guest_id: str) -> List[dict]:
        return [
            {
                "id": "65eb3f7be3b05dcfaea1c43b",
                "checkin": "2023-12-24",
                "checkout": "2023-12-31",
                "reservation_name": "Holiday Stay",
                "property_id": "65eb3f6ee3b05dcfaea1c43a",
                "account_id": guest_id,
            }
        ]

    def __init__(self):
            self.reservations = []
    def get_all(self, limit=10, offset=0) -> List[dict]:
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
def test_list_reservations():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[ReservationsRepo] = lambda: FakeReservationRepo()
    # Act
    app.dependency_overrides[authenticator.get_current_account_data] = fake_current_account
    app.dependency_overrides[ReservationsRepo] = lambda: FakeReservationRepo()
    res = client.get("/api/reservations")
    #assert res.status_code ==200
    assert res.json() == { "reservations": []}
def test_create_reservation():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_current_account
    reservation_data = {
        "checkin": "2023-12-24",
        "checkout": "2023-12-31",
        "reservation_name": "Holiday Stay",
        "property_id": "65eb3f6ee3b05dcfaea1c43a",
        "account_id": "65eb3f6ee3b05dcfaea1c43a",
    }
    res = client.post("/api/reservations", json=reservation_data)
    #assert res.status_code == 200
    assert res.json()["checkin"] == reservation_data["checkin"]
    assert res.json()["checkout"] == reservation_data["checkout"]
    assert res.json()["reservation_name"] == reservation_data["reservation_name"]
    assert res.json()["property_id"] == reservation_data["property_id"]
    assert res.json()["account_id"] == reservation_data["account_id"]
    assert "id" in res.json()