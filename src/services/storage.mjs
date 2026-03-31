import {renderSavedSearches} from "./ui.mjs";

const BOOKMARKS_KEY = 'bookmarks';
const SAVE_SEARCHES_KEY = 'saved_searches';

export function getSavedSearches() {
    return JSON.parse(localStorage.getItem(SAVE_SEARCHES_KEY)) || [];
}

export function saveSearches(searches) {
    localStorage.setItem(SAVE_SEARCHES_KEY, JSON.stringify(searches));
}

export function deleteSavedSearch(container, index) {
    const savedSearches = getSavedSearches();
    savedSearches.splice(index, 1);
    saveSearches(savedSearches);

    renderSavedSearches(container, savedSearches);
}


export function getBookmarks() {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || [];
}

export function saveBookmarks(bookmarks) {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

export function toggleBookmark(article) {
    const bookmarks = getBookmarks();

    const exists = bookmarks.some(item => item.id === article.id);

    if (exists) {
        const updatedBookmarks = bookmarks.filter(item => item.id !== article.id);
        saveBookmarks(updatedBookmarks);
        return;
    }

    const bookmarkItem = {
        id: article.id,
        webTitle: article.webTitle,
        webUrl: article.webUrl,
        thumbnail: article.fields?.thumbnail || '',
        trailText: article.fields?.trailText || '',
        byline: article.fields?.byline || '',
        webPublicationDate: article.webPublicationDate
    };

    bookmarks.push(bookmarkItem);
    saveBookmarks(bookmarks);
}

export function isBookmarked(articleId) {
    return getBookmarks().some(item => item.id === articleId);
}