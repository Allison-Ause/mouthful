import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getWord } from '../services/word-service.js';
import createSingleServing from '../components/singleServing.js';
import { saveWord } from '../services/wordsToProfiles.js';

// State
let user = null;
let word = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    word = await getWord(15);

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleRemoveWord({ word_id, profile_id }) {
    console.log('removes word');
    // const dataToUpdate = {
    //     word_id,
    //     profile_id,
    // };

    // await saveWord(dataToUpdate);
}

async function handleAddWord() {
    console.log('adds word');
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
