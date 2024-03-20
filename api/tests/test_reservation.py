from fastapi.testclient import TestClient
from queries.reservations import ReservationsRepo
from main import app
from authenticator import authenticator
from fastapi import APIRouter, Depends
from typing import List
from models import ReservationList, AccountOut

client = TestClient(app)

router = APIRouter()

@app.get("/api/reservations", response_model=ReservationList)
def list_reservations_by_account(
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
    reservations_repo: ReservationsRepo = Depends(),
    ):
    return ReservationList(reservations=reservations_repo.get_all(guest_id=account_data['id']))

def fake_get_current_account_data():
    return {
        "id": "65eb3f6ee3b05dcfaea1c43a",
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

def test_list_reservations():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[ReservationsRepo] = lambda: FakeReservationRepo()
    # Act
    res = client.get("/api/reservations")
    # Assert
    assert res.status_code == 200
    assert res.json() == {
            "reservations": [
                {
                    "checkin": "2023-12-24",
                    "checkout": "2023-12-31",
                    "reservation_name": "Holiday Stay",
                    "property_id": "65eb3f6ee3b05dcfaea1c43a",
                    "account_id": "65eb3f6ee3b05dcfaea1c43a",
                    "id": "65eb3f7be3b05dcfaea1c43b"
                }
            ]
    }
