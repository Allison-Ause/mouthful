export default function createProfileBox(root) {
    initialize(root);
    const usernameDisplay = root.querySelector('.username');

    return ({ profile, ownProfile }) => {
        usernameDisplay.textContent = ownProfile ? `Your Pantry` : `Chef ${profile.username}'s Pantry`;
    };
}

function initialize(root) {
    root.innerHTML = '';

    const usernameDisplay = document.createElement('h1');
    usernameDisplay.classList.add('username', 'shadowed');
    root.append(usernameDisplay);
}
