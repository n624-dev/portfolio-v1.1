document.addEventListener("DOMContentLoaded", function () {
    fetch(`./api/news/?limit=5`)
        .then(response => response.json())
        .then(data => {
            data.contents.forEach((item, index) => {
                const titleElement = document.querySelector(`#title${index + 1}`);
                if (titleElement) {
                    categoryname = item.category.name;
                    titlename = item.title;
                    titleElement.textContent = "[" + categoryname + "]" + titlename;

                    if (item.title.trim().length > 0) {
                        titleElement.style.display = "list-item";
                    }

                    titleElement.addEventListener('click', () => {
                        window.location.href = `/newsview?contents=${item.id}`;
                    });
                }
            });
        })
        .catch((err) => console.error(err));
});