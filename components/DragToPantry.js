export default function createDragToPantry(root, { handleSaveWord }) {


    return (profile) => {

        root.addEventListener('dragenter', dragEnter);
        root.addEventListener('dragover', dragOver);
        root.addEventListener('dragleave', dragLeave);
        root.addEventListener('drop', dragDrop(handleSaveWord));

        function dragEnter(e) {
            e.preventDefault();
            console.log('entered target');

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
                const wordId = parseInt(e.dataTransfer.getData('text/plain'));

                if (profile.words.find(x => x.id === wordId)) {
                    textBubble.classList.remove('hidden');
                    return;
                }

                const id = parseInt(e.dataTransfer.getData('text/plain'));
                handler(id);
                // check if it's there, on drop we return
            };
        }
    };
}

const textBubble = document.querySelector('#text-bubble');


