from fastapi.testclient import TestClient
from queries.reservations import ReservationsRepo
from pydantic import BaseModel
from main import app
from authenticator import authenticator
from fastapi import APIRouter, Depends, FastAPI
from pydantic import BaseModel
from typing import List

client = TestClient(app)

router = APIRouter()

class ReservationIn(BaseModel):
    checkin: str
    checkout: str
    reservation_name: str
    property_id: str
    account_id: str

class ReservationOut(ReservationIn):
    id: str
    reservation_name: str

class ReservationList(BaseModel):
    reservations : List[ReservationOut]

class AccountOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    username: str

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

# def create_reservation():
#     #Arrange
#     app.dependency_overrides[ReservationsRepo] = FakeReservationRepo
#     res = client.post("api/reservations")
#     assert res.status_code == 200
#     assert res.json() == [

#         {
#             "checkin": "2023-12-24",
#             "checkout": "2023-12-31",
#             "reservation_name": "Holiday Stay",
#             "property_id": "65eb3f6ee3b05dcfaea1c43a",
#             "account_id": "65f88f2772fc829e0b9896d8a",
#         }
#     ]

