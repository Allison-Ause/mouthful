import { getUser, signOut } from './services/auth-service.js';
import { getWords } from './services/word-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createBulkBin from './components/BulkBin.js';

// State
let user = null;
let words = [];
let word = '';
let id = '';

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    words = await getWords(id, word);

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

const BulkBin = createBulkBin(document.querySelector('#bulk-bin-list'));

function display() {
    User({ user });
    BulkBin({ words });

}

handlePageLoad();
