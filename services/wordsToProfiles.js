import { client, checkResponse } from './client.js';

export async function saveWord(data) {
    const response = await client
        .from('words_to_profile')
        .insert({ word_id: data.word_id })
        .single();
    return checkResponse(response);
}

export async function removeWord(word_id, profile_id) {
    const response = await client
        .from('words_to_profile')
        .delete()
        .match({ word_id, profile_id });
    return checkResponse(response);
}

async function getAddedWord(id) {
    const response = await client
        .from('words_to_profile')
        .select(`
            id,  
            user:profiles (
                id, 
                username
            ),
            word:words (*)
        `)
        .eq('id', id)
        .single();

    if (!checkResponse(response)) return null;

    const data = response.data;

    return data;
}


export function targetAddWord(listener) {
    client.from('words_to_profile')
        .on('INSERT', async (payload) => {
            const newPayload = payload.new;
            
            // const data = await getNotification(newPayload.word_id);
            // use the id of the many-to-many table to get the data from that table,
            const { user, word } = await getAddedWord(newPayload.id);
            // const user = getUserProfile(data.profiles, newPayload.profile_id);

            // not sure exactly how this needs to go together
            const result = {
                username: user.username,
                profile_id: user.id,
                word: word,
                word_id: newPayload.word_id,
            };
            listener(result);
        })
        .subscribe();
    return () => {
        client.removeSubscription(targetAddWord);
    };  
}