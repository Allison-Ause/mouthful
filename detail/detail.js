import { getUser, signOut } from '../services/auth-service.js';
import { getWordByID, protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getProfile, getWord, addRecipe } from '../services/word-service.js';
import createSingleServing from '../components/singleServing.js';
import { removeWord, saveWord } from '../services/wordsToProfiles.js';
import createUsersWithWord from '../components/userWordList.js';
import createRecipeList from '../components/RecipeList.js';
import createRecipeForm from '../components/RecipeForm.js';

// State
let user = null;
let profile = null;
let word = null;
let wordID = null;


// Action Handlers
async function handlePageLoad() {
    user = getUser();
    if (protectPage(user)) return;

    const params = new URLSearchParams(window.location.search);
    wordID = Number(params.get('id'));

    if (!wordID) {
        window.location.replace('../');
        return;
    }

    profile = await getProfile(user.id);
    word = await getWord(wordID);

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleRemoveWord(word_id) {
    await removeWord(word_id, profile.id);

    const item = getWordByID(word.profiles, word_id, profile.id);
    const index = word.profiles.indexOf(item);

    word.profiles.splice(index, 1);

    display();
}

async function handleAddWord(word_id) {
    const dataToUpdate = {
        word_id,
        profile_id: Number(profile.id)
    };

    await saveWord(dataToUpdate);

    word.profiles.push(profile);

    display();
}

async function handleAddRecipe(sentence) {
    const recipe = await addRecipe(word, profile, sentence);

    recipe.profile = profile;
    word.recipes.push(recipe);

    display();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const SingleServing = createSingleServing(document.querySelector('.word-card'), 
    handleRemoveWord,
    handleAddWord,
);

const UsersWithWord = createUsersWithWord(document.querySelector('.username-box'));

const RecipeList = createRecipeList(document.querySelector('.recipe-box'));

createRecipeForm(document.querySelector('.recipe-form'), { handleAddRecipe });

function display() {
    User({ profile });
    SingleServing(word, user);
    UsersWithWord({ profiles: word.profiles, curUser: user });
    RecipeList({ recipes: word.recipes });
}

handlePageLoad();
