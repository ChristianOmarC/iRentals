const propertyData = [

    {
        "name": "Sunny Corner Loft",
        "address": {
            "address": "456 Elm Street",
            "city": "Springfield",
            "state": "IL",
            "zip": "62704"
        },
        "bedrooms": 1,
        "bathrooms": 1,
        "price": 1800,
        "description": "Bright, airy loft with an open floor plan and industrial finishes. Features large windows and a central location, ideal for young professionals.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": true,
            "parking": true,
            "beer": false,
            "wifi": true,
            "pets_allowed": false,
            "pool": false
        },
        "image": "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Modern Suburban House",
        "address": {
            "address": "789 Pine Street",
            "city": "Riverside",
            "state": "CA",
            "zip": "92507"
        },
        "bedrooms": 3,
        "bathrooms": 2.5,
        "price": 3500,
        "description": "A newly renovated house with a large backyard, modern kitchen, and spacious living area. Located in a quiet, family-friendly neighborhood.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": true,
            "parking": true,
            "beer": false,
            "wifi": true,
            "pets_allowed": true,
            "pool": true
        },
        "image": "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=3267&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Cozy Studio Apartment",
        "address": {
            "address": "1010 Maple Avenue",
            "city": "Brooklyn",
            "state": "NY",
            "zip": "11221"
        },
        "bedrooms": 0,
        "bathrooms": 1,
        "price": 1200,
        "description": "Compact and efficient studio apartment in a vibrant neighborhood, perfect for students or singles. Close to cafes, parks, and public transport.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": false,
            "parking": false,
            "beer": false,
            "wifi": true,
            "pets_allowed": true,
            "pool": false
        },
        "image": "https://images.unsplash.com/photo-1528913775512-624d24b27b96?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Luxury Downtown Condo",
        "address": {
            "address": "2020 High Street",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94107"
        },
        "bedrooms": 2,
        "bathrooms": 2,
        "price": 4500,
        "description": "High-end condominium with stunning city views, top-notch amenities, and concierge services. Located in the heart of the financial district.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": true,
            "parking": true,
            "beer": true,
            "wifi": true,
            "pets_allowed": false,
            "pool": true
        },
        "image": "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?q=80&w=3260&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Historic Brick Townhouse",
        "address": {
            "address": "3030 Willow Lane",
            "city": "Boston",
            "state": "MA",
            "zip": "02114"
        },
        "bedrooms": 4,
        "bathrooms": 3,
        "price": 5000,
        "description": "Charming and spacious townhouse with original woodwork, a private garden, and a modern kitchen. Located in a historic neighborhood with easy access to the city.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": true,
            "parking": false,
            "beer": false,
            "wifi": true,
            "pets_allowed": true,
            "pool": false
        },
        "image": "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Beachfront Villa",
        "address": {
            "address": "4040 Ocean Drive",
            "city": "Miami Beach",
            "state": "FL",
            "zip": "33140"
        },
        "bedrooms": 5,
        "bathrooms": 4,
        "price": 8000,
        "description": "Luxurious villa with direct beach access, a private pool, and expansive outdoor living spaces. Ideal for those seeking a premium coastal lifestyle.",
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
        "image": "https://images.unsplash.com/photo-1506126279646-a697353d3166?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Mountain Retreat Cabin",
        "address": {
            "address": "5050 Pinecrest Road",
            "city": "Aspen",
            "state": "CO",
            "zip": "81611"
        },
        "bedrooms": 3,
        "bathrooms": 2,
        "price": 3000,
        "description": "Secluded cabin in the woods with stunning mountain views, a fireplace, and a hot tub. Perfect for a peaceful getaway or outdoor adventure.",
        "amenities": {
            "ac": false,
            "heating": true,
            "washer_dryer": true,
            "parking": true,
            "beer": false,
            "wifi": true,
            "pets_allowed": true,
            "pool": false
        },
        "image": "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Urban Penthouse Suite",
        "address": {
            "address": "6060 Vista Boulevard",
            "city": "Los Angeles",
            "state": "CA",
            "zip": "90015"
        },
        "bedrooms": 3,
        "bathrooms": 3.5,
        "price": 6500,
        "description": "Sophisticated penthouse with a rooftop terrace, floor-to-ceiling windows, and designer finishes. Situated in a vibrant neighborhood with exclusive amenities.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": true,
            "parking": true,
            "beer": true,
            "wifi": true,
            "pets_allowed": false,
            "pool": true
        },
        "image": "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?q=80&w=3262&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Garden Cottage",
        "address": {
            "address": "7070 Rose Avenue",
            "city": "Portland",
            "state": "OR",
            "zip": "97217"
        },
        "bedrooms": 2,
        "bathrooms": 1,
        "price": 2200,
        "description": "Quaint cottage with a beautiful garden, hardwood floors, and a cozy fireplace. Located in a quiet, green neighborhood close to local shops and parks.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": true,
            "parking": true,
            "beer": false,
            "wifi": true,
            "pets_allowed": true,
            "pool": false
        },
        "image": "https://images.unsplash.com/photo-1641998277833-3a911b7b56d8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Central City Apartment",
        "address": {
            "address": "8080 Market Street",
            "city": "Philadelphia",
            "state": "PA",
            "zip": "19104"
        },
        "bedrooms": 2,
        "bathrooms": 2,
        "price": 2800,
        "description": "Modern apartment with a sleek design, located in the heart of the city. Walking distance to major attractions, restaurants, and nightlife.",
        "amenities": {
            "ac": true,
            "heating": true,
            "washer_dryer": true,
            "parking": false,
            "beer": false,
            "wifi": true,
            "pets_allowed": true,
            "pool": false
        },
        "image": "https://images.unsplash.com/photo-1612965607446-25e1332775ae?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

export default propertyData