import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getProfile, getWord } from '../services/word-service.js';
import createSingleServing from '../components/singleServing.js';
import { removeWord, saveWord } from '../services/wordsToProfiles.js';

// State
let user = null;
let word = [];
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile(user.id);
    word = await getWord(5);

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleRemoveWord(word_id) {
    console.log('removing');
    console.log('word id: ', word_id, 'profile id: ', profile.id);
    const data = await removeWord(word_id, profile.id);

    

    display();
}

async function handleAddWord(word_id) {
    console.log('updating');
    const dataToUpdate = {
        word_id,
        profile_id: Number(profile.id)
    };

    const data = await saveWord(dataToUpdate);
    data.profiles = { user_id: user.id };
    console.log(data);

    word[0].words_to_profile.push(data);

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

function display() {
    User({ user });
    SingleServing(word, user);
}

handlePageLoad();
