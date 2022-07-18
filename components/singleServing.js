export default function createSingleServing(wordCard, handleRemoveWord, handleAddWord) {

    return (word, user) => {
        console.log('single serving word: ', word);
        const h2 = wordCard.querySelector('h2');
        h2.textContent = word[0].word;

        const span = wordCard.querySelector('span');
        span.textContent = word[0].type;

        const p = wordCard.querySelector('p');
        p.textContent = word[0].definition;

        const button = wordCard.querySelector('button');
        const inPantry = inUserPantry(word, user);
        console.log('inPantry? : ', inPantry);

        if (inPantry) {
            button.textContent = 'remove from pantry';
            button.addEventListener('click', async () => {
                await handleRemoveWord(word[0].id);
                button.textContent = 'add to pantry';
                return;
            });
        }
        else {
            button.addEventListener('click', async () => {
                await handleAddWord(word[0].id);
                button.textContent = 'remove from pantry';
                return;
            });
        }
    };
}

function inUserPantry(word, user) {
    try {
        console.log('entered try');
        for (let i of word[0].words_to_profile) {
            console.log('profile user id: ', i.profiles.user_id, 'user id: ', user.id);
            if (i.profiles.user_id === user.id) return true;
        }}

    catch {
        return false;
    }
    
    return false;
}