export default function createUsersWithWord(usersBox) {
    
    return ({ users, curUser }, wordID) => {
        usersBox.innerHTML = '';

        const ul = document.createElement('ul');
        ul.classList.add('users-with-word');

        let displayed = false;

        for (let user of users) {
            if (user.profiles.user_id === curUser.id) continue;
            const li = createUserList(user, wordID);
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

function createUserList(user, wordID) {
   
    if (user.word_id === wordID) {
        const li = document.createElement('li');
        li.classList.add('user');

        const a = document.createElement('a');
        a.href = `../profile/?id=${user.profiles.user_id}`;

        const span = document.createElement('span');
        span.textContent = user.profiles.username;

        a.append(span);
        li.append(a);
        return li;
    }
}