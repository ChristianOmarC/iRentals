from fastapi.testclient import TestClient
from queries.properties import PropertiesRepo
from main import app

client = TestClient(app=app)


class FakePropertyRepo:
    def get_all(self):
        return [
            {
                "name": "string",
                "address": {
                    "address": "string",
                    "city": "string",
                    "state": "string",
                    "zip": "string",
                },
                "bedrooms": 1.5,
                "bathrooms": 1,
                "price": 169.99,
                "description": "string",
                "amenities": {
                    "ac": True,
                    "heating": True,
                    "washer_dryer": True,
                    "parking": True,
                    "beer": True,
                    "wifi": True,
                    "pets_allowed": True,
                    "pool": True,
                },
                "image": "string",
                "id": "string",
                "account_id": "string",
                "rating": 0.0,
            }
        ]


def test_get_all_properties():
    # Arrange
    app.dependency_overrides[PropertiesRepo] = FakePropertyRepo
    # Act
    res = client.get("/api/properties")
    # Assert
    assert res.status_code == 200
