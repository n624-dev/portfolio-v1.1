document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", function () {
        const newsListElement = document.getElementById('newsList');
        const categoryButtonsElement = document.getElementById('categoryButtons');
        let allNews;

        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('q');
        const limit = urlParams.get('limit');
        const draftKey = urlParams.get('draftKey');

        if (limit !== undefined && limit !== null) {
            var query = `limit=${limit}`;
        } else {
            var query = `limit=100`;
        }
        if (q !== undefined && q !== null) {
            var query = `${query}&q=${q}`;
        }
        if (draftKey !== undefined && draftKey !== null) {
            var query = `${query}&draftKey=${draftKey}`;
        }

        // query = limit q draftKey
        newsListElement.innerHTML = '';
        categoryButtonsElement.innerHTML = '';
        fetch(`https://www.n624.net/api/news/?${query}`)
            .then(response => response.json())
            .then(data => {
                const loader = document.getElementById('container');
                loader.style.display = "none";
                const searchdiv = document.getElementById('searchdiv');
                searchdiv.style.display = "flex";
                const totalCount = data.totalCount;
                if (totalCount == 0) {
                    const nosearch = document.createElement("p");
                    nosearch.classList.add('nosearch');
                    nosearch.textContent = `${q}\u0020\u306b\u4e00\u81f4\u3059\u308b\u60c5\u5831\u306f\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002`
                    const newslist = document.getElementById('newsList');
                    newslist.appendChild(nosearch);
                }
                allNews = data.contents;
                const categories = new Set();
                allNews.forEach((item, index) => {
                    categories.add(item.category.name);
                    const listItem = document.createElement('li');
                    const anchor = document.createElement('a');
                    if (draftKey !== undefined && draftKey !== null) {
                        anchor.href = `/newsview?contents=${item.id}&draftKey=${draftKey}`;
                    } else {
                        anchor.href = `/newsview?contents=${item.id}`;
                    }
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
                    if (draftKey !== undefined && draftKey !== null) {
                        anchor.href = `/newsview?contents=${item.id}&draftKey=${draftKey}`;
                    } else {
                        anchor.href = `/newsview?contents=${item.id}`;
                    }
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
                if (draftKey !== undefined && draftKey !== null) {
                    anchor.href = `/newsview?contents=${item.id}&draftKey=${draftKey}`;
                } else {
                    anchor.href = `/newsview?contents=${item.id}`;
                }
                anchor.textContent = `[${item.category.name}] ${item.title}`;
                listItem.appendChild(anchor);
                newsListElement.appendChild(listItem);
            });
        }
    });
});