export default function createUsersWithWord(usersBox) {
    
    return ({ profiles, curUser }, wordID) => {
        usersBox.innerHTML = '';

        const ul = document.createElement('ul');
        ul.classList.add('users-with-word');

        let displayed = false;

        for (let profile of profiles) {
            if (profile.user_id === curUser.id) continue;
            const li = createUserList(profile);
            ul.append(li);
            displayed = true;
        }
        if (!displayed) {
            const span = document.createElement('span');
            span.textContent = 'no users with this snack';
            ul.append(span);
        }
        usersBox.append(ul);
    };
}

function createUserList(profile) {
    const li = document.createElement('li');
    li.classList.add('user');

    const a = document.createElement('a');
    a.href = `../profile/?id=${profile.user_id}`;

    const span = document.createElement('span');
    span.textContent = profile.username;
    console.log(profile);

    a.append(span);
    li.append(a);
    return li;
}
