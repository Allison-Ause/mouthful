import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getWord } from '../services/word-service.js';

// State
let user = null;
let words = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    words = await getWord(15);
    console.log(words);

    display();
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

function display() {
    User({ user });

}

handlePageLoad();
