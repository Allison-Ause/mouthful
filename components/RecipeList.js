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

function Recipe({ recipe, profile }) {

    const li = document.createElement('li');

    const recipeSentence = document.createElement('p');
    recipeSentence.textContent = recipe.sentence;
    recipeSentence.classList.add('recipe-sentence');
    
    const recipeUsername = document.createElement('span');
    recipeUsername.textContent = recipe.profile.username;
    recipeUsername.classList.add('recipe-username');

    li.append(recipeSentence, recipeUsername);

    if (profile.id === recipe.profile_id) {
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'delete';
        deleteButton.classList.add('delete-button');

        li.append(deleteButton);
    }

    return li;
}

function initialize(root) {
    const ul = document.createElement('ul');
    root.append(ul);
}
