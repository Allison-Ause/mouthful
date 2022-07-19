import { getAuthRedirect } from '../utils.js';
export default function createUser(root, { handleSignOut }) {

    return ({ profile, hideProfileLink }) => {
        root.innerHTML = '';

        if (profile) {
            const nameDisplay = document.createElement('span');
            const username = profile.username;
            nameDisplay.textContent = username;
            root.append(nameDisplay);

            if (!hideProfileLink) {
                const profileLink = document.createElement('a');
                profileLink.textContent = 'View Pantry';
                profileLink.href = '../profile';
                root.append(profileLink);
            }

            const signOutLink = document.createElement('a');
            signOutLink.textContent = 'Sign out';
            signOutLink.href = '';
            signOutLink.addEventListener('click', () => {
                handleSignOut();
            });
            root.append(signOutLink);
        }
        else {
            const signInLink = document.createElement('a');
            signInLink.textContent = 'Sign in';
            signInLink.href = getAuthRedirect();

            root.append(signInLink);
        }
    };
}
