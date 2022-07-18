export default function createProfileWordsBox(root) {
    initialize(root);
    const ul = root.querySelector('ul');

    return ({ words }) => {
        ul.innerHTML = '';

        for (const word of words) {
            const li = document.createElement('li');
            li.classList.add('word-card');
            ul.append(li);

            const span = document.createElement('span');
            span.textContent = word.word;
            span.classList.add('word');
            li.append(span);
        }
    };
}

function initialize(root) {
    root.innerHTML = '';

    const ul = document.createElement('ul');
    root.append(ul);
}
