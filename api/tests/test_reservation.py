from fastapi.testclient import TestClient
from queries.reservations import ReservationsRepo
# ?Properties ---> ID 
from main import app

client = TestClient(app=app)

class FakeReservationRepo:
    def get_all(self, limit, offset):
        return [
            {
            "checkin": "2023-12-24",
            "checkout": "2023-12-31",
            "reservation_name": "Holiday Stay",
            "property_id": "65eb3f6ee3b05dcfaea1c43a",
            "account_id": "65eb3f6ee3b05dcfaea1c43a",
            "id": "65eb3f7be3b05dcfaea1c43b"
            }
        ]

def test_list_reservations():
    # Arrange
    app.dependency_overrides[ReservationsRepo] = FakeReservationRepo
    # Act
    res = client.get("/api/reservations")
    # Assert
    assert res.status_code == 200
    assert res.json() == [
        {
            "checkin": "2023-12-24",
            "checkout": "2023-12-31",
            "reservation_name": "Holiday Stay",
            "property_id": "65eb3f6ee3b05dcfaea1c43a",
            "account_id": "65eb3f6ee3b05dcfaea1c43a",
            "id": "65eb3f7be3b05dcfaea1c43b"
        }
    ]

def create_reservation():
    #Arrange
    app.dependency_overrides[ReservationsRepo] = FakeReservationRepo
    res = client.post("api/reservations")
    assert res.status_code == 200
    assert res.json() == [
    
        {
            "checkin": "2023-12-24",
            "checkout": "2023-12-31",
            "reservation_name": "Holiday Stay",
            "property_id": "65eb3f6ee3b05dcfaea1c43a",
            "account_id": "65f88f2772fc829e0b9896d8a",
        }
    ]