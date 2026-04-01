
import { getFormattedDate } from "../helpers/dateHelper.mjs";
import {isBookmarked} from "./storage.mjs";

export function renderArticles(article) {
    const container = document.getElementById('articlesContainer');
    const bookmarked = isBookmarked(article.id);

    container.innerHTML +=
        `<article class="article-card" data-id="${article.id}">
            <img src="${article.fields?.thumbnail || ''}" alt="${article.webTitle}">
            <p>${getFormattedDate(article.webPublicationDate) || ''} ${'| '+article.fields?.byline || ''}</p>
            <h3>${article.webTitle || ''}</h3>
            <p>${article.fields?.trailText || 'No description available.'}</p>
            <button class="details-btn" data-id="${article.id}">Details</button>
            <button class="bookmark-btn" data-id="${article.id}">
            ${bookmarked ? 'Remove Bookmark' : 'Bookmark'}
            </button>
        </article>`
}

export function renderSavedSearches(container, savedSearches) {

    if (!savedSearches.length) {
        container.innerHTML = '<p>No saved searches yet.</p>';
        return;
    }

    container.innerHTML = savedSearches.map((item, index) => `
        <div class="saved-search-item">
            <button class="saved-search-btn" data-index="${index}">
                ${item.query || 'All news'}
                ${item.section ? ` | ${item.section}` : ''}
                ${item.fromDate ? ` | from: ${item.fromDate}` : ''}
                ${item.toDate ? ` | to: ${item.toDate}` : ''}
                ${item.orderBy ? ` | ${item.orderBy}` : ''}
            </button>

            <button class="delete-saved-search-btn" data-index="${index}">
                Delete
            </button>
        </div>
    `).join('');
}

export function renderBookmarks(bookmarks) {
    const container = document.getElementById('bookmarksList');

    if (!bookmarks.length) {
        container.innerHTML = '<p>No bookmarks yet.</p>';
        return;
    }

    container.innerHTML = bookmarks.map(item => `
        <div class="bookmark-item">
            <img src="${item.thumbnail || ''}" alt="${item.webTitle}">
            <div class="bookmark-content">
                <h4>${item.webTitle}</h4>
                <p>
                    ${item.webPublicationDate ? new Date(item.webPublicationDate).toLocaleDateString() : ''}
                    ${item.byline ? ' | ' + item.byline : ''}
                </p>
                <button>
                <a href="${item.webUrl}" target="_blank" rel="noopener noreferrer" class="open-article-btn">
                    Open article
                </a>
                </button>
                
                <button class="remove-bookmark-btn" data-id="${item.id}">
                    Remove
                </button>
            </div>
        </div>
    `).join('');
}

export function showStatus(message, showRetry = false) {
const statusSection = document.getElementById('statusSection');
const statusMessage = document.getElementById('statusMessage');
const retryBtn = document.getElementById('retryBtn');

statusMessage.textContent = '';
statusMessage.textContent = message;
statusSection.classList.remove('hidden');

if (showRetry) {
    retryBtn.classList.remove('hidden');
} else {
    retryBtn.classList.add('hidden');
}
}

export function hideStatus() {
    const statusSection = document.getElementById('statusSection');
    const retryBtn = document.getElementById('retryBtn');

    statusSection.classList.add('hidden');
    retryBtn.classList.add('hidden');
}