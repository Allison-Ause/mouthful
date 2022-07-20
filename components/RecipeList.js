export default function createRecipeList(root, { handleRemoveRecipe }) {
    initialize(root);
    const ul = root.querySelector('ul');

    return ({ recipes, profile }) => {
        ul.innerHTML = '';

        for (const recipe of recipes) {
            const li = Recipe({ recipe, profile, handleRemoveRecipe });
            ul.append(li);
        }
    };
}

function Recipe({ recipe, profile, handleRemoveRecipe }) {

    const li = document.createElement('li');

    const recipeSentence = document.createElement('p');
    recipeSentence.textContent = recipe.sentence;
    recipeSentence.classList.add('recipe-sentence');
    
    const div = document.createElement('div');
    div.classList.add('username-delete-row');

    const recipeUsername = document.createElement('span');
    recipeUsername.textContent = recipe.profile.username;
    recipeUsername.classList.add('recipe-username');

    const deleteButton = document.createElement('span');

    if (profile.id === recipe.profile.id) {
        deleteButton.textContent = 'delete';
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', async () => {
            await handleRemoveRecipe(recipe.id);
        });
    }

    div.append(recipeUsername, deleteButton);

    li.append(recipeSentence, div);

    return li;
}

function initialize(root) {
    const ul = document.createElement('ul');
    root.append(ul);
}
