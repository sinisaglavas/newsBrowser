
import {getArticles} from "./services/guardianApi.mjs";
import {renderArticles} from "./services/ui.mjs";
import {state} from "./services/state.mjs";
import {openModal, closeModal} from "./services/modal.mjs";

const searchForm = document.getElementById('searchForm');
const queryInput = document.getElementById('query');

const articlesContainer = document.getElementById('articlesContainer');
const modalCloseBtn = document.getElementById('modalCloseBtn');


searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const sectionSelect = document.getElementById('section').value;


    const query = queryInput.value.trim();

    if (!query) {
        return alert('Enter a search query!');
    }

    const response = await getArticles(query);

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





