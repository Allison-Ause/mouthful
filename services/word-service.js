import { client, checkResponse } from './client.js';

export async function getWords() {
    const response = await client
        .from('words')
        .select(`
            id,
            word`);

    return checkResponse(response);
    // TODO: get all words and return an array
    // on error, return null
}

export async function getWord(id) {
    const response = await client
        .from('words')
        .select(`*, 
            words_to_profile (
                *, 
                profiles (*)
            )`)
        .eq('id', id);
    return checkResponse(response);
}

export async function getProfile(userId) {
    // TODO: get the profile from user id
    // on error, return null
}

export async function getProfileWithSavedWords(userId) {
    // TODO: get the profile from user id
    // join on foreign table relationship to get saved words
    // on error, return null
}
