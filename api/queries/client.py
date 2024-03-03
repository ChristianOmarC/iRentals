import os
from pymongo import MongoClient

# Environment variables for database connection
DATABASE_URL = os.environ.get("DATABASE_URL", "mongodb://localhost:27017")  # Default to localhost if not specified
DB_NAME = os.environ.get("DB_NAME", "mongo-data")  # Default database name

# MongoClient connection
client = MongoClient(DATABASE_URL)
db = client[DB_NAME]

class MongoQueries:
    def __init__(self, collection_name):
        self.collection_name = collection_name

    @property
    def collection(self):
        """Access the collection for the specific subclass."""
        return db[self.collection_name]

# Example subclass for a specific collection
class UserQueries(MongoQueries):
    def __init__(self):
        super().__init__('users')  # Specify the collection name for users

    def find_user_by_email(self, email):
        """Example query to find a user by email."""
        return self.collection.find_one({"email": email})

# Usage example
if __name__ == "__main__":
    user_queries = UserQueries()
    user = user_queries.find_user_by_email("user@example.com")
    print(user)
