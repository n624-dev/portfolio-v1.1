document.addEventListener("DOMContentLoaded", function () {
    const newsListElement = document.getElementById('newsList');
    const categoryButtonsElement = document.getElementById('categoryButtons');
    let allNews;

    var { q, limit, draftKey } = "";
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams.entries()) {
        if (key !== 'contents') {
            params[key] = value;
        }
    }
    var { q, limit, draftKey } = params;
    if (limit) {
        var query = `limit=${limit}`;
    } else {
        var query = `limit=100`;
    }
    if (q) {
        var query = `${query}&q=${q}`;
    }
    if (draftKey) {
        var query = `${query}&draftKey=${draftKey}`;
    }

    // query = limit q draftKey

    fetch(`./api/news/?${query}`)
        .then(response => response.json())
        .then(data => {
            const loader = document.getElementById('container');
            loader.style.display = "none";
            allNews = data.contents;
            const categories = new Set();
            allNews.forEach((item, index) => {
                categories.add(item.category.name);
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = `/newsview.html?contents=${item.id}`;
                anchor.textContent = `[${item.category.name}] ${item.title}`;
                listItem.appendChild(anchor);
                newsListElement.appendChild(listItem);
            });
            const allButton = document.createElement('a');
            allButton.textContent = '\u3059\u3079\u3066';
            allButton.addEventListener('click', () => showAllNews());
            categoryButtonsElement.insertBefore(allButton, categoryButtonsElement.firstChild);
            categories.forEach((category) => {
                const button = document.createElement('a');
                button.textContent = category;
                button.addEventListener('click', () => filterNewsByCategory(category));
                categoryButtonsElement.appendChild(button);
            });
        })
        .catch((error) => console.error(error));

    function filterNewsByCategory(category) {
        newsListElement.innerHTML = '';
        allNews.forEach((item, index) => {
            if (item.category.name === category) {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = `/newsview.html?contents=${item.id}`;
                anchor.textContent = `[${item.category.name}] ${item.title}`;
                listItem.appendChild(anchor);
                newsListElement.appendChild(listItem);
            }
        });
    }

    function showAllNews() {
        newsListElement.innerHTML = '';

        allNews.forEach((item, index) => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = `/newsview.html?contents=${item.id}`;
            anchor.textContent = `[${item.category.name}] ${item.title}`;
            listItem.appendChild(anchor);
            newsListElement.appendChild(listItem);
        });
    }
});
