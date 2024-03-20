from fastapi.testclient import TestClient
from queries.properties import PropertiesRepo
from main import app

client = TestClient(app=app)

class FakePropertyRepo:
    def get_all(self, limit, offset):
        return [
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
                            "ac": True,
                            "heating": True,
                            "washer_dryer": True,
                            "parking": True,
                            "beer": True,
                            "wifi": True,
                            "pets_allowed": True,
                            "pool": True
                        },
                        "id": "65eb3f7be3b05dcfaea1c43b",
                        "account_id": "65eb3f6ee3b05dcfaea1c43a"
                        }
                    ]
                    }
            }
        ]

def test_list_property():
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
                            "ac": True,
                            "heating": True,
                            "washer_dryer": True,
                            "parking": True,
                            "beer": True,
                            "wifi": True,
                            "pets_allowed": True,
                            "pool": True
                        },
                        "id": "65eb3f7be3b05dcfaea1c43b",
                        "account_id": "65eb3f6ee3b05dcfaea1c43a"
                        }
                    ]
                    }
            }
    }

