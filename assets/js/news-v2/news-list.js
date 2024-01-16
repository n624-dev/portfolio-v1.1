const { createClient } = microcms;

const client = createClient({
    serviceDomain: 'n624',
    apiKey: 'uNzMJ5Va607OeMOEb5vDhjRtSiG4v5eQ0xnx',
    retry: true
});

document.addEventListener("DOMContentLoaded", function () {

    const newsListElement = document.getElementById('newsList');
    const categoryButtonsElement = document.getElementById('categoryButtons');

    let allNews; // 新しく追加

    client.get({ endpoint: 'news' })
        .then((res) => {
            allNews = res.contents; // 変更

            const categories = new Set();

            allNews.forEach((item, index) => {
                categories.add(item.category.name);

                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = `/newsview?contents=${item.id}`;
                anchor.textContent = `[${item.category.name}] ${item.title}`;
                listItem.appendChild(anchor);
                newsListElement.appendChild(listItem);
            });

            categories.forEach((category) => {
                const button = document.createElement('button');
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
                anchor.href = `/newsview?contents=${item.id}`;
                anchor.textContent = `[${item.category.name}] ${item.title}`;
                listItem.appendChild(anchor);
                newsListElement.appendChild(listItem);
            }
        });
    }
});
