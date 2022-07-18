import { client, checkResponse } from './client.js';

export async function getWords() {
    // TODO: get all words and return an array
    // on error, return null
}

export async function getWord(word) {
    // TODO: get the word that matches wordId
    // join on foreign table relationship to get profiles
    // on error, return null
    const response = await client
        .from('words')
        .select(`*, 
            words_to_profiles (*), 
            profiles (*)`)
        .eq('id', word.id);
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
