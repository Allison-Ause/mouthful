import { client, checkResponse } from './client.js';

export function getUser() {
    return client.auth.user();
}

export async function signUp(email, password) {
    const response = await client.auth.signUp({ email, password });

    if (response.error) return null;
    await createProfile(response.user);
    return response;
}

export async function signIn(email, password) {
    return await client.auth.signIn({ email, password });
}

export async function signOut() {
    return await client.auth.signOut();
}

export async function createProfile(user) {
    const defaultUsername = user.email.match(/.+(?=@)/)[0];

    const response = await client
        .from('profiles')
        .insert({
            user_id: user.id,
            username: defaultUsername
        });

    return checkResponse(response);
}
