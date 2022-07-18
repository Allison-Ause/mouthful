import { getAuthRedirect } from '../utils.js';
export default function createUser(root, { handleSignOut }) {

    return ({ user }) => {
        root.innerHTML = '';

        if (user) {
            const nameDisplay = document.createElement('span');
            const username = user?.email.split('@')[0];
            nameDisplay.textContent = username;

            const profileLink = document.createElement('a');
            profileLink.textContent = 'View Profile';
            profileLink.href = '../profile';

            const signOutLink = document.createElement('a');
            signOutLink.textContent = 'Sign out';
            signOutLink.href = '';
            signOutLink.addEventListener('click', () => {
                handleSignOut();
            });

            root.append(nameDisplay, profileLink, signOutLink);
        }
        else {
            const signInLink = document.createElement('a');
            signInLink.textContent = 'Sign in';
            signInLink.href = getAuthRedirect();

            root.append(signInLink);
        }
    };
}

