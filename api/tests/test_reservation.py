from fastapi.testclient import TestClient
from queries.reservations import ReservationsRepo
from main import app

client = TestClient(app=app)

class FakeReservationRepo:
    def get_all(self):
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
