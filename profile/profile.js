// Utils
import { protectPage } from '../utils.js';

// Services
import { getUser, signOut } from '../services/auth-service.js';
import { getProfileWithSavedWords, getProfile } from '../services/word-service.js';

// Component Constructors
import createUser from '../components/User.js';
import createProfileBox from '../components/ProfileBox.js';
import createProfileWordsBox from '../components/ProfileWordsBox.js';
import { removeWord } from '../services/wordsToProfiles.js';

// State
let user = null;
let profile = null;
let viewedProfile = null;
let ownProfile = false;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    if (protectPage(user)) return true;

    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('id');

    [profile, viewedProfile] = await Promise.all([
        getProfile(user.id),
        getProfileWithSavedWords(userId ?? user.id)
    ]);

    ownProfile = profile.id === viewedProfile.id;

    display();
}

// Event Handlers
async function handleSignOut() {
    signOut();
}

async function handleDeleteSavedWord(word) {
    await removeWord(word.id, profile.id);

    const index = profile.saved_words.indexOf(word);
    if (index === -1) return;

    profile.saved_words.splice(index, 1);
    display();
}

// Components
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);
const ProfileBox = createProfileBox(document.querySelector('#profile-box'));
const ProfileWordsBox = createProfileWordsBox(
    document.querySelector('#profile-words'),
    { handleDeleteSavedWord }
);

function display() {
    User({ profile, hideProfileLink: ownProfile });
    ProfileBox({ profile: viewedProfile, ownProfile });
    ProfileWordsBox({ words: viewedProfile.saved_words, ownProfile });
}

handlePageLoad();
