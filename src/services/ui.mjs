
import { getFormattedDate } from "../helpers/dateHelper.mjs";

export function renderArticles(article) {
    const container = document.getElementById('articlesContainer');

    container.innerHTML +=
        `<article class="article-card" data-id="${article.id}">
            <img src="${article.fields?.thumbnail || ''}" alt="${article.webTitle}">
            <p>${getFormattedDate(article.webPublicationDate) || ''} ${'| '+article.fields?.byline || ''}</p>
            <h3>${article.webTitle || ''}</h3>
            <p>${article.fields?.trailText || 'No description available.'}</p>
            <button class="details-btn" data-id="${article.id}">Details</button>
            <button class="bookmark-btn" data-id="${article.id}">Bookmark</button>
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