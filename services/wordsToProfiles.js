import { client, checkResponse } from './client.js';
import { getWord } from './word-service.js';

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
        .eq('word_id', word_id, 'profile_id', profile_id);
    return checkResponse(response);
}

function getUserProfile(profiles, userID) {
    for (let profile of profiles) {
        if (profile.id === userID) return profile;
        return null;
    }}

export function targetAddWord(listener) {
    client.from('words_to_profile')
        .on('INSERT', async (payload) => {
            const newPayload = payload.new;
            
            const data = await getWord(newPayload.word_id);
            const user = getUserProfile(data.profiles, newPayload.profile_id);

            const word = {
                username: user.username,
                profile_id: user.id,
                word: data.word,
                word_id: newPayload.word_id,
            };
            listener(word);
        })
        .subscribe();
    return () => {
        client.removeSubscription(targetAddWord);
    };  
}