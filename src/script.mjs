
import {getArticles} from "./services/guardianApi.mjs";
import {renderArticles, renderBookmarks, renderSavedSearches} from "./services/ui.mjs";
import {state} from "./services/state.mjs";
import {openModal, closeModal} from "./services/modal.mjs";
import {
    deleteSavedSearch,
    getBookmarks,
    getSavedSearches,
    saveBookmarks,
    saveSearches,
    toggleBookmark
} from "./services/storage.mjs";


const searchForm = document.getElementById('searchForm');
const queryInput = document.getElementById('query');

const savedSearchesList = document.getElementById('savedSearchesList');
const bookmarksList = document.getElementById('bookmarksList');

const articlesContainer = document.getElementById('articlesContainer');
const modalCloseBtn = document.getElementById('modalCloseBtn');

const saveSearchBtn = document.getElementById('saveSearchBtn');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = queryInput.value.trim();
    const section = document.getElementById('section').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const orderBy = document.getElementById('orderBy').value;

    if (!query && !section && !fromDate && !toDate && !orderBy) {
        return alert('Enter a new search!');
    }

    const response = await getArticles(query, section, fromDate, toDate, orderBy);

    const articles = response.data.response.results;
    state.articles = articles;

    articlesContainer.innerHTML = '';

    for (const article of articles) {
        renderArticles(article);
    }
});

articlesContainer.addEventListener('click', (event) => {
    const detailsBtn = event.target.closest('.details-btn');
    const bookmarkBtn = event.target.closest('.bookmark-btn');

    if (detailsBtn) {
        const articleId = detailsBtn.dataset.id;
        const article = state.articles.find(item => item.id === articleId);

        if (!article) return;

        openModal(article);
    }

    if (bookmarkBtn) {
        const articleId = bookmarkBtn.dataset.id;
        const article = state.articles.find(item => item.id === articleId);

        if (!article) return;

        toggleBookmark(article);

        const container = document.getElementById('articlesContainer');
        container.innerHTML = '';

        for (const item of state.articles) {
            renderArticles(item);
        }

        refreshBookmarks();
    }
})

modalCloseBtn.addEventListener('click', closeModal);

saveSearchBtn.addEventListener('click', () => {
    const query = queryInput.value.trim();
    const section = document.getElementById('section').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const orderBy = document.getElementById('orderBy').value;

    if (!query && !section && !fromDate && !toDate && !orderBy) {
        return alert('Search fields is empty!');
    }

    const savedSearch = {
        query,
        section,
        fromDate,
        toDate,
        orderBy
    }

    const savedSearches = getSavedSearches(); // initial first (empty ?)array

    const existingSearch = savedSearches.some(item =>
            item.query === savedSearch.query &&
            item.section === savedSearch.section &&
            item.fromDate === savedSearch.fromDate &&
            item.toDate === savedSearch.toDate &&
            item.orderBy === savedSearch.orderBy
    );

    if (existingSearch) return;

    savedSearches.push(savedSearch);
    saveSearches(savedSearches);

    renderSavedSearches(savedSearchesList, savedSearches);
})

savedSearchesList.addEventListener('click', async (event) => {
    const savedSearchBtn = event.target.closest('.saved-search-btn');

    if (!savedSearchBtn) return;

    const savedSearchId = savedSearchBtn.dataset.index;
    const savedSearches = JSON.parse(localStorage.getItem('saved_searches'));
    const requestedSearch = savedSearches[savedSearchId];

    const query = requestedSearch.query ? requestedSearch.query : 'All news';
    const section = requestedSearch.section;
    const fromDate = requestedSearch.fromDate;
    const toDate = requestedSearch.toDate;
    const orderBy = requestedSearch.orderBy;

    const response = await getArticles(query, section, fromDate, toDate, orderBy);

    const articles = response.data.response.results;
    state.articles = articles;

    articlesContainer.innerHTML = '';

    for (const article of articles) {
        renderArticles(article);
    }

    refreshBookmarks();
})

savedSearchesList.addEventListener('click', (event) => {
    const deleteSavedSearchBtn = event.target.closest('.delete-saved-search-btn');

    if (!deleteSavedSearchBtn) return;

    const savedSearchId = deleteSavedSearchBtn.dataset.index;

    deleteSavedSearch(savedSearchesList, savedSearchId);
})

bookmarksList.addEventListener('click', (event) => {
    const removeBookmarkBtn = event.target.closest('.remove-bookmark-btn');

    if (!removeBookmarkBtn) return;

    const articleId = removeBookmarkBtn.dataset.id;
    const bookmarks = getBookmarks().filter(item => item.id !== articleId);

    saveBookmarks(bookmarks);
    refreshBookmarks();

    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    for (const item of state.articles) {
        renderArticles(item);
    }
})

function refreshBookmarks() {
    renderBookmarks(getBookmarks());
}

renderSavedSearches(savedSearchesList, getSavedSearches());
refreshBookmarks();