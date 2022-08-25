export default function createProfileWordsBox(root, { handleDeleteSavedWord }) {
    initialize(root);
    const ul = root.querySelector('ul');

    return ({ words, ownProfile }) => {
        ul.innerHTML = '';

        for (const word of words) {
            const li = document.createElement('li');
            li.classList.add('word-card');
            ul.append(li);

            const a = document.createElement('a');
            a.href = `/detail/?id=${word.id}`;
            a.textContent = word.word;
            a.classList.add('word', 'word-link');
            li.append(a);

            const hr = document.createElement('hr');
            li.append(hr);

            const typeSpan = document.createElement('span');
            typeSpan.textContent = word.type;
            typeSpan.classList.add('word-type');
            li.append(typeSpan);

            if (ownProfile) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'remove from pantry';
                li.append(deleteButton);

                deleteButton.addEventListener('click', async () => {
                    await handleDeleteSavedWord(word);
                });
            }
        }

        if (words.length === 0) {
            const li = document.createElement('li');
            li.classList.add('word-card');
            ul.append(li);

            const span = document.createElement('span');
            span.textContent = 'empty shelves';
            li.append(span);
        }
    };
}

function initialize(root) {
    root.innerHTML = '';

    const ul = document.createElement('ul');
    root.append(ul);
}
