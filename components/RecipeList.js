export default function createRecipeList(root) {
    initialize(root);
    const ul = root.querySelector('ul');

    return ({ recipes }) => {
        ul.innerHTML = '';

        for (const recipe of recipes) {
            const li = Recipe({ recipe });
            ul.append(li);
        }
    };
}

function Recipe({ recipe }) {

    const li = document.createElement('li');

    const recipeUsername = document.createElement('span');
    recipeUsername.textContent = recipe.profile.username;
    recipeUsername.classList.add('recipe-username');

    const recipeSentence = document.createElement('p');
    recipeSentence.textContent = recipe.sentence;
    recipeSentence.classList.add('recipe-sentence');

    li.append(recipeUsername, recipeSentence);

    return li;
}

function initialize(root) {
    const ul = document.createElement('ul');
    root.append(ul);
}
