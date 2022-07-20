export default function createProfileBox(root) {
    initialize(root);
    const usernameDisplay = root.querySelector('.username');

    return ({ profile }) => {
        usernameDisplay.textContent = `Chef ${profile.username}'s Pantry`;
    };
}

function initialize(root) {
    root.innerHTML = '';

    const usernameDisplay = document.createElement('h1');
    usernameDisplay.classList.add('username');
    root.append(usernameDisplay);
}
