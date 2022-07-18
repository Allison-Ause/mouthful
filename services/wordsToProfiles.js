import { client, checkResponse } from './client.js';

export async function saveWord(data) {
    const response = await client
        .from('words_to_profile')
        .insert({ word_id: data.word_id, profile_id: data.profile_id })
        .single();
    return checkResponse(response);
}

export async function removeWord(word_id, profile_id) {
    const response = await client
        .from('words_to_profile')
        .delete()
        .eq('word_id', word_id, 'profile_id', profile_id)
        .single();
    return checkResponse(response);
}