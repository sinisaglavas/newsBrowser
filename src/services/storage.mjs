const BOOKMARKS_KEY = 'bookmarks';
const SAVE_SEARCHES_KEY = 'saved_searches';

export function getBookmarks() {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || [];
}

export function saveBookmarks(bookmarks) {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

export function getSavedSearches() {
    return JSON.parse(localStorage.getItem(SAVE_SEARCHES_KEY)) || [];
}

export function saveSearches(searches) {
    localStorage.setItem(SAVE_SEARCHES_KEY, JSON.stringify(searches));
}