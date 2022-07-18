export default function createSingleServing(wordCard, handleRemoveWord, handleAddWord) {

    return (word, user) => {
        wordCard.innerHTML = '';

        const props = createWordCard(word, user, handleRemoveWord, handleAddWord);
        wordCard.append(props);
    };
}

function createWordCard(word, user, handleRemoveWord, handleAddWord) {

    const h2 = document.createElement('h2');
    h2.textContent = word[0].word;

    const span = document.createElement('span');
    span.textContent = word[0].type;

    const p = document.createElement('p');
    p.textContent = word[0].definition;

    const button = document.createElement('button');
    const inPantry = inUserPantry(word, user);

    if (inPantry) {
        button.textContent = 'remove from pantry';
        button.addEventListener('click', async () => {
            await handleRemoveWord(word[0].id);
            button.textContent = 'add to pantry';
        });
    }
    else {
        button.textContent = 'add to pantry';
        button.addEventListener('click', async () => {
            await handleAddWord(word[0].id);
        });
    }
    
    const wordCard = document.createElement('div');
    wordCard.append(h2, span, p, button);
    return wordCard;
}

function inUserPantry(word, user) {
    try {
        for (let i of word[0].words_to_profile) {
            if (i.profiles.user_id === user.id) return true;
        }}
    catch {
        return false;
    }
    return false;
}