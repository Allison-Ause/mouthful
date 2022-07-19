export default function createRecipeList(root) {
    initialize(root);
    const ul = root.querySelector('ul');

    return ({ recipes }) => {
        ul.innerHTML = '';

        for (const recipe of recipes) {
            const li = document.createElement('li');
            // TODO: implement this display
        }
    };
}

function initialize(root) {
    const ul = document.create('ul');
    root.append(ul);
}
