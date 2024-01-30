const { createClient } = microcms;

document.addEventListener("DOMContentLoaded", function () {
    const client = createClient({
        serviceDomain: 'n624',
        apiKey: 'uNzMJ5Va607OeMOEb5vDhjRtSiG4v5eQ0xnx',
        retry: true
    });

    const newsListElement = document.getElementById('newsList');
    const categoryButtonsElement = document.getElementById('categoryButtons');

    let allNews;

    client.get({ endpoint: 'news' })
        .then((res) => {
            allNews = res.contents;

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
            allButton.textContent = 'すべて';
            allButton.addEventListener('click', () => showAllNews());
            
            categoryButtonsElement.insertBefore(allButton, categoryButtonsElement.firstChild);

            categories.forEach((category) => {
                const button = document.createElement('a');
                button.textContent = category;
                button.addEventListener('click', () => filterNewsByCategory(category));
                categoryButtonsElement.appendChild(button);
            });
        })
        .catch((err) => console.error(err));

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
