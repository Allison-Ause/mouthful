import { getUser, signOut } from './services/auth-service.js';
import { getProfile, getWords } from './services/word-service.js';
import { saveWord, targetAddWord } from './services/wordsToProfiles.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createBulkBin from './components/BulkBin.js';
import { createNotification } from './components/notification.js';
import createDragToPantry from './components/DragToPantry.js';

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

    [profile, words] = await Promise.all([
        getProfile(user.id),
        getWords(id, word)
    ]);

    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * words.length);

        const [poppedItem] = words.splice(index, 1);

        randomWords.push(poppedItem);
    }

    targetAddWord(userActivity => {
        if (userActivity.profile_id === profile.id) return;
        createNotification(document.querySelector('.notifications-box'), userActivity);
        display();
    });

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleSaveWord(wordId) {
    if (!wordId) return;
    if (profile.words.find(x => x.id === wordId)) return;

    await saveWord({
        word_id: wordId,
        profile_id: profile.id
    });
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const BulkBin = createBulkBin(document.querySelector('#bulk-bin-list'));

const DragToPantry = createDragToPantry(document.querySelector('.drag-pantry'),
    { handleSaveWord }
);

function display() {
    User({ profile });
    BulkBin({ words:randomWords });
    DragToPantry(profile);
}

handlePageLoad();
