import { client, checkResponse } from './client.js';

export async function saveWord(data) {
    const response = await client
        .from('words_to_profile')
        .insert({ data })
        .single();
    return checkResponse(response);
}