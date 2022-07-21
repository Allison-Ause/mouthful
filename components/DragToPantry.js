export default function createDragToPantry(root, { handleSaveWord }) {
    root.addEventListener('dragenter', dragEnter);
    root.addEventListener('dragover', dragOver);
    root.addEventListener('dragleave', dragLeave);
    root.addEventListener('drop', dragDrop(handleSaveWord));

    return () => {};
}

function dragEnter(e) {
    e.preventDefault();
    console.log('did enter target');
}

function dragOver(e) {
    e.preventDefault();
    console.log('did hover over target');
}

function dragLeave(e) {
    e.preventDefault();
    console.log('did leave target');
}

function dragDrop(handler) {
    return e => {
        e.preventDefault();
        const id = parseInt(e.dataTransfer.getData('text/plain'));
        handler(id);
    };
}
