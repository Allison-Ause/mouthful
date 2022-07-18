// Utils
import { protectPage } from '/utils.js';

// Services
import { getUser, signOut } from '/services/auth-service.js';
import { getProfile } from '/services/word-service.js';

// Component Constructors
import createUser from '/components/User.js';
import createProfileBox from '/components/ProfileBox.js';
import createProfileWordsBox from '/components/ProfileWordsBox.js';

// State
let user = null;
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('id');

    profile = await getProfile(userId ?? user.id);

    if (!profile) return;

    display();
}

// Event Handlers
async function handleSignOut() {
    signOut();
}

// Components
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);
const ProfileBox = createProfileBox(document.querySelector('#profile-box'));
const ProfileWordsBox = createProfileWordsBox(document.querySelector('#profile-words'));

function display() {
    User({ user });
    ProfileBox({ profile });
    ProfileWordsBox({ words: profile.saved_words });
}

handlePageLoad();
