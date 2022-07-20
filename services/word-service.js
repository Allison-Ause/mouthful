import { client, checkResponse } from './client.js';

const PROFILE_TABLE = 'profiles';

export async function getWords() {
    const response = await client
        .from('words')
        .select(`
            id,
            word`);

    return checkResponse(response);
}

export async function getWord(id) {
    const response = await client
        .from('words')
        .select(`*,
            recipes(
                id,
                profile: profiles(*),
                sentence
            ), 
            profiles: words_to_profile(
                profile: profiles(*)
            )`
        )
        .eq('id', id)
        .single();
    if (!checkResponse(response)) return null;

    const data = response.data;
    data.profiles = data.profiles.map(x => x.profile);

    return data;
}

export async function addRecipe(word, profile, sentence) {
    const response = await client
        .from('recipes')
        .insert({
            profile_id: profile.id,
            word_id: word.id,
            sentence
        })
        .single();

    return checkResponse(response);

}

export async function removeRecipe(recipeId) {
    const response = await client
        .from('recipes')
        .delete()
        .eq('id', recipeId)
        .single();
    
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
