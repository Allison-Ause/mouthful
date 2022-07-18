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
            a.href = `/detail/?word=${word.id}`;
            a.textContent = word.word;
            a.classList.add('word');
            li.append(a);


            if (ownProfile) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'delete';
                li.append(deleteButton);

                deleteButton.addEventListener('click', async () => {
                    await handleDeleteSavedWord(word);
                });
            }
        }

        if (words.length === 0) {
            const li = document.createElement('li');
            li.classList.add('empty-message');
            ul.append(li);

            const span = document.createElement('span');
            span.textContent = 'No saved words.';
            li.append(span);
        }
    };
}

function initialize(root) {
    root.innerHTML = '';

    const ul = document.createElement('ul');
    root.append(ul);
}
