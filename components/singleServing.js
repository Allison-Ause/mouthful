export default function createSingleServing(wordCard, handleRemoveWord, handleAddWord) {

    return (word, user) => {
        wordCard.innerHTML = '';

        const props = createWordCard(word, user, handleRemoveWord, handleAddWord);
        wordCard.append(props);
    };
}

function createWordCard(word, user, handleRemoveWord, handleAddWord) {

    const h2 = document.createElement('h2');
    h2.textContent = word.word;

    const span = document.createElement('span');
    span.textContent = word.type;

    const p = document.createElement('p');
    p.textContent = word.definition;

    const button = document.createElement('button');
    const inPantry = inUserPantry(word, user);


    if (inPantry) {
        button.textContent = 'remove from pantry';
        button.addEventListener('click', async () => {
            await handleRemoveWord(word.id);
            button.textContent = 'add to pantry';
        });
    }
    else {
        button.textContent = 'add to pantry';
        button.addEventListener('click', async () => {
            await handleAddWord(word.id);
        });
    }

    const wordCard = document.createElement('div');
    wordCard.append(h2, span, p, button);
    return wordCard;
}

function inUserPantry(word, user) {

    for (let profile of word.profiles) {
        if (profile.user_id === user.id) return true;
    }
    return false;
}