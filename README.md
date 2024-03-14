<div align="center">

# 🏡 iRental: Unlocking the World of Property Rentals and Sales

</div>

## Team:

-   **Justin Leopard - **
-   **Murray Milton - **
-   **Prayag Patel - **
-   **Christian Culajay - **

## Design

iRental revolutionizes the property rental and sales market by providing a comprehensive platform that allows users to list, manage, and book properties with ease. From exotic vacations to city escapes, iRental offers a wide range of property options for renters and buyers alike. Sellers can effortlessly manage their listings, while users can explore and book stays in just a few clicks.

## Built With

Our project is built using cutting-edge technologies for both frontend and backend development:

### Front-end:

-   **React**: To build a dynamic and responsive user interface.
    ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white)
-   **Tailwind CSS**: For custom, utility-first CSS.
    ![Tailwind](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
-   **Bootstrap**: For responsive design and layout.
    ![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
-   **Redux**: For managing application state.
    ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white)

### Back-end:

-   **FastAPI**: High-performance, easy to learn, fast to code framework.
    ![FastAPI](https://img.shields.io/badge/-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
-   **MongoDB**: For flexible, scalable NoSQL database management.
    ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
-   **Express**: Minimalist web framework for Node.js.
    ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
-   **JWT Auth**: For secure user authentication.
    ![JWT](https://img.shields.io/badge/-JWT%20Auth-000000?style=flat-square&logo=json-web-tokens&logoColor=white)

## How To Run Application 🐳

![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

Follow these steps to get the application up and running on your local machine:

1. **Open your terminal.**
2. **Navigate to the directory where you would like to clone the project.**
3. **Clone the repo:** `git clone https://github.com/yourusername/irental-project.git`
4. **Change the directory to the project folder.**
5. **Ensure that your Docker Desktop Application is open.**
6. **Run the following commands in sequence:**
7. **docker volume create mongo-data:**
8. **docker compose build:**
9. **docker compose compose up:**

## Features

### Property Management:

-   **List Properties**: Users can list their properties for rent or sale, including details like location, price, and amenities.
-   **Manage Bookings**: Property owners can manage reservations, check-in/check-out dates, and availability.
-   **Search and Filter**: Renters and buyers can search for properties based on location, price, and other filters.

### User Accounts:

-   **Secure Authentication**: Users can sign up, log in, and manage their accounts securely using JWT authentication.
-   **Profile Management**: Users can update their profile information and preferences.

### Reservation System:

-   **Reserve Properties**: Users can book properties for specific dates, with immediate confirmation.

## How It All Comes Together

iRental integrates these features through a user-friendly interface, backed by a robust backend that ensures smooth and secure operations. Our platform brings together property owners and travelers, making it easier than ever to find and book the perfect stay.

## Integration: Seamless User Experience

iRental's frontend and backend systems work in harmony to provide a seamless user experience. The frontend, built with React, Tailwind, and Bootstrap, offers a dynamic and responsive interface. Meanwhile, the backend ensures efficient data management and security with FastAPI, MongoDB, Express, and JWT Auth.

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

# iRental API Documentation

## Properties

### Endpoints

| Action                     | Method | URL                                         |
| -------------------------- | ------ | ------------------------------------------- |
| List properties            | GET    | `http://localhost:8000/api/properties/`     |
| Create a property          | POST   | `http://localhost:8000/api/properties/`     |
| Get a specific property    | GET    | `http://localhost:8000/api/properties/{id}` |
| Update a specific property | PUT    | `http://localhost:8000/api/properties/{id}` |
| Delete a specific property | DELETE | `http://localhost:8000/api/properties/{id}` |

### JSON body for property data

When creating or updating a property, send the following JSON payload:

```json
{
    "name": "Ocean View Condo",
    "address": {
        "address": "123 Beach Ave",
        "city": "Seaside",
        "state": "CA",
        "zip": "90210"
    },
    "bedrooms": 2,
    "bathrooms": 2,
    "price": 350000,
    "description": "A beautiful condo with an ocean view, modern amenities, and easy beach access.",
    "amenities": {
        "ac": true,
        "heating": true,
        "washer_dryer": true,
        "parking": true,
        "beer": false,
        "wifi": true,
        "pets_allowed": false,
        "pool": true
    },
    "image": "https://example.com/image.jpg",
    "id": "unique_property_id",
    "account_id": "owner_account_id"
}
```

### Reservations:

| Action                        | Method | URL                                          |
| ----------------------------- | ------ | -------------------------------------------- |
| List all reservations         | GET    | http://localhost:8000/api/reservations/      |
| Create a reservation          | POST   | http://localhost:8000/api/reservations/      |
| Get a specific reservation    | GET    | http://localhost:8000/api/reservations/{id}/ |
| Update a specific reservation | PUT    | http://localhost:8000/api/reservations/{id}/ |
| Cancel (delete) a reservation | DELETE | http://localhost:8000/api/reservations/{id}/ |

###

### JSON body for reservation data:

#### Create and Update a Reservation (SEND THIS JSON BODY):

For each reservation, specify the check-in and check-out dates, the name under which the reservation is made, the associated property, and the account ID of the user making the reservation.

```json
{
    "checkin": "2024-01-01",
    "checkout": "2024-01-07",
    "reservation_name": "John Doe",
    "property_id": "unique_property_id",
    "account_id": "unique_account_id"
}
```

### Accounts:

| Action                    | Method | URL                                      |
| ------------------------- | ------ | ---------------------------------------- |
| List all accounts         | GET    | http://localhost:8000/api/accounts/      |
| Create an account         | POST   | http://localhost:8000/api/accounts/      |
| Get a specific account    | GET    | http://localhost:8000/api/accounts/{id}/ |
| Update a specific account | PUT    | http://localhost:8000/api/accounts/{id}/ |
| Delete a specific account | DELETE | http://localhost:8000/api/accounts/{id}/ |

### JSON Body for Account Data

When creating or updating an account, send the following JSON payload:

```json
{
    "email": "example@email.com",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "password": "securePassword123"
}
```
