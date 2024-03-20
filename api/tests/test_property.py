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
                            "zip": "string"
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
                            "pool": True
                        },
                        "image": "string",
                        "id": "string",
                        "account_id": "string",
                        "rating": 0.0
                        }
        ]

def test_get_all_properties():
    # Arrange
    app.dependency_overrides[PropertiesRepo] = FakePropertyRepo
    # Act
    res = client.get("/api/properties")
    # Assert
    assert res.status_code == 200
    assert res.json() == {
        {
                {
                    "properties": [
                        {
                        "name": "string",
                        "address": {
                            "address": "string",
                            "city": "string",
                            "state": "string",
                            "zip": "string"
                        },
                        "bedrooms": 0,
                        "bathrooms": 0,
                        "price": 0,
                        "description": "string",
                        "amenities": {
                            "ac": true,
                            "heating": true,
                            "washer_dryer": true,
                            "parking": true,
                            "beer": true,
                            "wifi": true,
                            "pets_allowed": true,
                            "pool": true
                        },
                        "id": "65eb3f7be3b05dcfaea1c43b",
                        "account_id": "65eb3f6ee3b05dcfaea1c43a"
                        }
                    ]
                    }
            }
    }