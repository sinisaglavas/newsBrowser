
export function openModal(article) {
    const modal = document.getElementById('articleModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h2>${article.webTitle}</h2>
        <p>${article.fields?.trailText || ''}</p>
        <a href="${article.webUrl}" target="_blank">Read full article</a>
    `;

    modal.classList.remove('hidden');
}

export function closeModal() {
    document.getElementById('articleModal').classList.add('hidden');
}