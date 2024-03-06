export async function login(baseUrl, username, password) {
    const url = `${baseUrl}/token`
    const form = new FormData()
    form.append('username', username)
    form.append('password', password)
    const response = await fetch(url, {
        method: 'post',
        credentials: 'include',
        body: form,
    })
    if (!response.ok) {
        throw Error('Failed to get token after login')
    }
    const data = await response.json()
    if (data.access_token) {
        return data.access_token
    } else {
        throw Error('Failed to get token after login.')
    }
}

// export async function register(accountData) {
//     const baseUrl = process.env.VITE_API_HOST
//     if (!baseUrl) {
//         throw Error('REACT_APP_USER_SERVICE_API_HOST is not set')
//     }
//     const response = await fetch(`${process.env.VITE_API_HOST}/api/account`, {
//         method: 'POST',
//         credentials: 'include',
//         body: JSON.stringify(accountData),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     if (!response.ok) {
//         throw Error(
//             "Couldn't create account, please try a new username or email address"
//         )
//     }
// }

export async function register(accountData) {
    const baseUrl = process.env.VITE_API_HOST
    if (!baseUrl) {
        throw Error('REACT_APP_USER_SERVICE_API_HOST is not set')
    }
    const response = await fetch(`${process.env.VITE_API_HOST}/api/account`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(accountData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw Error(
            "Couldn't create account, please try a new username or email address"
        )
    }
}
// export interface AccountData {
//     username: string;
//     password: string;
//     first_name: string;
//     last_name: string;
//     age: string;
//     email: string;
// }

// interface LoginResponse {
//     access_token: string;
//     token_type: string;
// }

// export async function login(
//     baseUrl: string,
//     username: string,
//     password: string
// ): Promise<string> {
//     const url = `${baseUrl}/token`;
//     const form = new FormData();
//     form.append("username", username);
//     form.append("password", password);
//     const response = await fetch(url, {
//         method: "post",
//         credentials: "include",
//         body: form,
//     });
//     if (!response.ok) {
//         throw Error("Failed to get token after login");
//     }
//     const data: LoginResponse = await response.json();
//     if (data.access_token) {
//         return data.access_token;
//     } else {
//         throw Error("Failed to get token after login.");
//     }
// }

// export async function register(accountData: AccountData): Promise<void> {
//     const response = await fetch(
//         `${import.meta.env.VITE_APP_API_HOST}/api/user`,
//         {
//             method: "POST",
//             credentials: "include",
//             body: JSON.stringify(accountData),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         }
//     );
//     if (!response.ok) {
//         throw Error(
//             "Couldn't create account, please try a new username or email address"
//         );
//     }
// }
