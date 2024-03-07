const API_URL = import.meta.env.VITE_API_HOST

async function login(username, password) {
    const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
        // Optionally, you could parse the response to provide more detailed error messages
        const errorDetails = await response.json()
        throw new Error(errorDetails.message || 'Failed to login')
    }

    const data = await response.json()
    return data.access_token
}

async function register(accountData) {
    const response = await fetch(`${API_URL}/api/accounts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
    })

    if (!response.ok) {
        const errorDetails = await response.json()
        throw new Error(errorDetails.message || 'Failed to register')
    }

    return response.json()
}

export { login, register }
