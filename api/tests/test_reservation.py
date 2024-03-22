from fastapi.testclient import TestClient
from queries.reservations import ReservationsRepo
from main import app
from authenticator import authenticator
from fastapi import APIRouter
from models import (
    ReservationIn,
    ReservationOut,
)
from typing import List

client = TestClient(app=app)

router = APIRouter()


def fake_get_current_account_data():
    return {
        "id": "65eb3f6ee3b05dcfaea1c43a",
        "email": "Billy@email.com",
        "first_name": "Billy",
        "last_name": "Bob",
        "username": "BillyBob",
    }


class FakeReservationRepo:
    def __init__(self):
        self.reservations = []

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

    def create(
        self, reservation: ReservationIn, guest_id: str
    ) -> ReservationOut:
        reservation_id = str(len(self.reservations) + 1)
        new_reservation = ReservationOut(
            id=reservation_id,
            checkin=reservation.checkin,
            checkout=reservation.checkout,
            reservation_name=reservation.reservation_name,
            property_id=reservation.property_id,
            account_id=guest_id,
        )
        self.reservations.append(new_reservation)
        return new_reservation

    def delete_reservation(self, reservation_id: str) -> bool:
        return True


def test_list_reservations():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    app.dependency_overrides[ReservationsRepo] = FakeReservationRepo
    res = client.get("/api/reservations")
    app.dependency_overrides = {}

    assert res.status_code == 200


def test_create_reservation():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    app.dependency_overrides[ReservationsRepo] = FakeReservationRepo
    reservation_data = {
        "checkin": "2023-12-24",
        "checkout": "2023-12-31",
        "reservation_name": "Holiday Stay",
        "property_id": "65eb3f6ee3b05dcfaea1c43a",
        "account_id": "65eb3f6ee3b05dcfaea1c43a",
        "id": "65eb3f6ee3b05dcfaea1c43a",
    }
    res = client.post("/api/reservations", json=reservation_data)
    app.dependency_overrides = {}
    assert res.status_code == 200


def test_delete_reservation():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )

    app.dependency_overrides[ReservationsRepo] = FakeReservationRepo
    reservation_id = "65fd9cc4e64390f813a94a79"
    delete_res = client.delete(f"/api/reservations/{reservation_id}")

    assert delete_res.status_code == 200
    assert delete_res.json() == {"message": "Reservation deleted successfully"}
