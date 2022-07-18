export default function createProfileBox(root) {
    initialize(root);
    const usernameDisplay = root.querySelector('.username');

    return ({ profile }) => {
        usernameDisplay.textContent = profile.username;
    };
}

function initialize(root) {
    root.innerHTML = '';

    const usernameDisplay = document.createElement('p');
    usernameDisplay.classList.add('username');
    root.append(usernameDisplay);
}
