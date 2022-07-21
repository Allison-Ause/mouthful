export default function createBulkBin(root) {

    return ({ words }) => {

        root.innerHTML = '';
    
        for (const word of words) {
            const li = WordCard(word);
            root.append(li);
        }
    };
}

function WordCard(word) {

    const li = document.createElement('li');
    li.classList.add('word-card');

    const a = document.createElement('a');
    a.href = `../detail/?id=${word.id}`;
    a.classList.add('word', 'word-link');
    a.draggable = true; //add draggable attribute 

    a.addEventListener('dragstart', dragStart);

    a.textContent = word.word;
    li.append(a);
    const hr = document.createElement('hr');
    li.append(hr);

    const typeSpan = document.createElement('span');
    typeSpan.textContent = word.type;
    typeSpan.classList.add('word-type');
    li.append(typeSpan);

    return li;
}

function dragStart(e) {
    e.preventDefault();
    console.log('firing');
}

function dragEnter(e) { // for recipient
    e.preventDefault();
}

function dragOver(e) { // for recipient
    e.preventDefault();
}

function dragLeave(e) {
    e.preventDefault();
}