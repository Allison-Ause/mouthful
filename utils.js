
export async function protectPage(user) {
    if (!user) {
        location.replace(getAuthRedirect());
    }
}

export function getAuthRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `/auth/?redirectUrl=${redirectUrl.toString()}`;
}

export function getWordByID(list, wordID, profileID) {
    for (let word of list) {
        if ((word.word_id === Number(wordID) && (word.profile_id === profileID))) return word;
    }
    return null;
}