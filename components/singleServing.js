export default function createSingleServing(wordCard, handleRemoveWord, handleAddWord) {

    return (word, user) => {
        const h2 = wordCard.querySelector('h2');
        h2.textContent = word[0].word;

        const span = wordCard.querySelector('span');
        span.textContent = word[0].type;

        const p = wordCard.querySelector('p');
        p.textContent = word[0].definition;

        const button = wordCard.querySelector('button');
        const inPantry = inUserPantry(word, user);
        if (inPantry) {
            button.textContent = 'remove from pantry';
            button.addEventListener('click', async () => {
                await handleRemoveWord(word[0].id);
                button.textContent = 'add to pantry';
            });
        }
        else {
            button.addEventListener('click', async () => {
                await handleAddWord(word[0].id);
                button.textContent = 'remove from pantry';
            });
        }
    };
}

function inUserPantry(word, user) {
    for (let i of word[0].words_to_profile) {
        if (i.profiles.user_id === user.id) return true;
    }
    return false;
}