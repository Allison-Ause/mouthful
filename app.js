import { getUser, signOut } from './services/auth-service.js';
import { getWords } from './services/word-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';

// State
let user = null;
let words = [];
let word = '';
let id = '';

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    const data = await getWords(id, word);
    words = data;

    console.log(words);
    display();
}

// handle 

async function handleSignOut() {
    signOut();
}

// Components
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

// Create Component for Word List display

function display() {
    User({ user });

}

handlePageLoad();
