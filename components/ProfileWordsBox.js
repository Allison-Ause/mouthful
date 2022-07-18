export default function createProfileWordsBox(root) {
    initialize(root);
    const ul = root.querySelector('ul');

    return ({ words }) => {
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
        }
    };
}

function initialize(root) {
    root.innerHTML = '';

    const ul = document.createElement('ul');
    root.append(ul);
}
