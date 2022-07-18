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
    };
}

function initialize(root) {
    root.innerHTML = '';

    const ul = document.createElement('ul');
    root.append(ul);
}
