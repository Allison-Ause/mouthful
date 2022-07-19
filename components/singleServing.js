export default function createSingleServing(wordCard, handleRemoveWord, handleAddWord) {

    return (word, user) => {
        wordCard.innerHTML = '';

        const props = createWordCard(word, user, handleRemoveWord, handleAddWord);
        wordCard.append(props);
    };
}

function createWordCard(word, user, handleRemoveWord, handleAddWord) {

    const h3 = document.createElement('h3');
    h3.classList.add('word');
    h3.textContent = word.word;

    const span = document.createElement('span');
    span.classList.add('word-type');
    span.textContent = word.type;

    const hr = document.createElement('hr');

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
    wordCard.append(h3, span, hr, p, button);
    return wordCard;
}

function inUserPantry(word, user) {

    for (let profile of word.profiles) {
        if (profile.user_id === user.id) return true;
    }
    return false;
}
