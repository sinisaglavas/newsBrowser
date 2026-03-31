
import {getArticles} from "./services/guardianApi.mjs";
import {renderArticles, renderSavedSearches} from "./services/ui.mjs";
import {state} from "./services/state.mjs";
import {openModal, closeModal} from "./services/modal.mjs";
import {getSavedSearches, saveSearches} from "./services/storage.mjs";


const searchForm = document.getElementById('searchForm');
const queryInput = document.getElementById('query');

const savedSearchesList = document.getElementById('savedSearchesList');

const articlesContainer = document.getElementById('articlesContainer');
const modalCloseBtn = document.getElementById('modalCloseBtn');

const saveSearchBtn = document.getElementById('saveSearchBtn');

renderSavedSearches(savedSearchesList, getSavedSearches());

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
        console.log(article);
        renderArticles(article);
    }
});

articlesContainer.addEventListener('click', (event) => {
    const detailsBtn = event.target.closest('.details-btn');

    if (!detailsBtn) return; // avoid error if the user clicks on the non-details button

    const articleId = detailsBtn.dataset.id;

    const article = state.articles.find(item => item.id === articleId);

    if (!article) return;

    openModal(article);
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

savedSearchesList.addEventListener('click', (event) => {
    const savedSearchBtn = event.target.closest('.saved-search-btn');

    if (!savedSearchBtn) return;

    const savedSearchId = savedSearchBtn.dataset.index;
    const savedSearches = JSON.parse(localStorage.getItem('saved_searches'));
    const oneSavedSearch = savedSearches[savedSearchId];

    const query = oneSavedSearch.query ? oneSavedSearch.query : 'All news';
    const section = oneSavedSearch.section;
    const fromDate = oneSavedSearch.fromDate;
    const toDate = oneSavedSearch.toDate;
    const orderBy = oneSavedSearch.orderBy;

    
})

savedSearchesList.addEventListener('click', (event) => {
    const deleteSavedSearchBtn = event.target.closest('.delete-saved-search-btn');

    if (!deleteSavedSearchBtn) return;

    const savedSearchId = deleteSavedSearchBtn.dataset.index;
    const savedSearches = JSON.parse(localStorage.getItem('saved_searches'));

    savedSearches.splice(savedSearchId, 1);
    saveSearches(savedSearches);
    renderSavedSearches(savedSearchesList, savedSearches);
})

