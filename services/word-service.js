import { client, checkResponse } from './client.js';

const PROFILE_TABLE = 'profiles';

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
    const response = await client
        .from(PROFILE_TABLE)
        .select('*')
        .eq('user_id', userId)
        .single();

    return checkResponse(response);
}

export async function getProfileWithSavedWords(userId) {
    const response = await client
        .from(PROFILE_TABLE)
        .select(`*,
            saved_words:words_to_profile(
                word:words(*)
            )
        `)
        .eq('user_id', userId)
        .single();

    if (!checkResponse(response)) return null;

    const data = response.data;
    data.saved_words = data.saved_words.map(x => x.word);

    return data;
}
