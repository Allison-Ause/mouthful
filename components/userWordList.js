export default function createUsersWithWord(usersBox) {
    
    return (users, wordID) => {
        usersBox.innerHTML = '';

        const ul = document.createElement('ul');
        ul.classList.add('users-with-word');

        for (let user of users.users) {
            const li = createUserList(user, wordID);
            ul.append(li);
        }
        usersBox.append(ul);
    };
}

function createUserList(user, wordID) {
    try {
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
    catch (error) {
        if (error) {
            const span = document.createElement('span');
            span.textContent = 'no users with this snack';
            return span;
        }
    } 
}