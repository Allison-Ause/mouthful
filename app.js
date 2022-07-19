import { getUser, signOut } from './services/auth-service.js';
import { getProfile, getWords } from './services/word-service.js';
import { targetAddWord } from './services/wordsToProfiles.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createBulkBin from './components/BulkBin.js';

// State
let user = null;
let profile = null;
let words = [];
let word = '';
let id = '';
let randomWords = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    if (protectPage(user)) return;

    profile = await getProfile(user.id);
    words = await getWords(id, word);

    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * words.length);

        const [poppedItem] = words.splice(index, 1);

        randomWords.push(poppedItem);
    }

    targetAddWord(userActivity => {
        console.log(userActivity);
    });

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

const BulkBin = createBulkBin(document.querySelector('#bulk-bin-list'));

function display() {
    User({ profile });
    BulkBin({ words:randomWords });
}

handlePageLoad();
