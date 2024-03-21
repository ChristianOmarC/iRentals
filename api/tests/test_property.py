from authenticator import MyAuthenticator
from models import PropertyIn, PropertyOut
from fastapi.testclient import TestClient
from queries.properties import PropertiesRepo
from main import app


client = TestClient(app=app)
def fake_current_account():
    return {"id": "65eb3f6ee3b05dcfaea1c43a",
            "email": "Billy@email.com",
            "first_name": "Billy",
            "last_name": "Bob",
            "username": "BillyBob",
           }


class FakePropertyRepo:
    def __init__(self):
            self.properties = []

    def get_all(self):
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
        ]

    def create(self, property_data: PropertyIn) -> PropertyOut:
            property_id = str(len(self.properties) + 1)
            new_property = PropertyOut(
                id=property_id,
                name=property_data.name,
                address=property_data.address,
                bedrooms=property_data.bedrooms,
                bathrooms=property_data.bathrooms,
                price=property_data.price,
                description=property_data.description,
                amenities=property_data.amenities,
                account_id=property_data.account_id
            )
            self.properties.append(new_property)
            return new_property

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

        def test_create_property():

            app.dependency_overrides[MyAuthenticator.get_current_account_data] = fake_current_account
            app.dependency_overrides[PropertiesRepo] = lambda: FakePropertyRepo

            # Create a property
            property_data = {
                "name": "Test Property",
                "address": "123 Test St",
                "bedrooms": 3,
                "bathrooms": 2,
                "price": 2000.0,
                "description": "A lovely property for rent",
                "amenities": ["wifi", "parking"],
                "account_id": "65eb3f6ee3b05dcfaea1c43a"
            }
            created_property = PropertiesRepo.create(PropertyIn(**property_data))

            # Check that the property was created
            assert created_property.id is not None
            assert created_property.name == property_data["name"]
            assert created_property.address == property_data["address"]
            assert created_property.bedrooms == property_data["bedrooms"]
            assert created_property.bathrooms == property_data["bathrooms"]
            assert created_property.price == property_data["price"]
            assert created_property.description == property_data["description"]
            assert created_property.amenities == property_data["amenities"]
            assert created_property.account_id == property_data["account_id"]
