import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getProfile } from '../services/word-service.js';

// State
let user = null;
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile(user.id);

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
    User({ profile });
}

handlePageLoad();
