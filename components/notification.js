export function createNotification(box, data) {
    box.innerHTML = '';


    const div = document.createElement('div');
    div.classList.add('notification');

    const span = document.createElement('span');
    span.textContent = `chef ${data.username} added `;

    const a = document.createElement('a');
    a.href = `./detail/?id=${data.word_id}`;

    const span2 = document.createElement('span');
    span2.textContent = data.word;

    a.append(span2);
    span.append(a);
    div.append(span);

    box.append(div);
}