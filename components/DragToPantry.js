export default function createDragToPantry(root, { handleSaveWord }) {

    return (profile) => {
        root.addEventListener('dragenter', dragEnter);
        root.addEventListener('dragover', dragOver);
        root.addEventListener('dragleave', dragLeave);
        root.addEventListener('drop', dragDrop(handleSaveWord));

        function dragEnter(e) {
            e.preventDefault();
        }
        
        function dragOver(e) {
            e.preventDefault();
        }
        
        function dragLeave(e) {
            e.preventDefault();
        }
        
        function dragDrop(handler) {
            return e => {
                e.preventDefault();
                const wordId = parseInt(e.dataTransfer.getData('text/plain'));

                if (profile.words.find(x => x.id === wordId)) {
                    textBubble.classList.remove('hidden');
                    textBubble.textContent = 'Already Shelved';
                    setTimeout(() => {
                        textBubble.classList.add('hidden');
                    }, 2000);
                    return;
                }

                textBubble.classList.remove('hidden');
                textBubble.textContent = 'Shelved!';
                setTimeout(() => {
                    textBubble.classList.add('hidden');
                }, 2000);

                const id = parseInt(e.dataTransfer.getData('text/plain'));
                handler(id);
            };
        }
    };
}

const textBubble = document.querySelector('#text-bubble');


