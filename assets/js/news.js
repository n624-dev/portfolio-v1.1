const { createClient } = microcms;

document.addEventListener("DOMContentLoaded", function () {
    const client = createClient({
        serviceDomain: 'n624',
        apiKey: 'uNzMJ5Va607OeMOEb5vDhjRtSiG4v5eQ0xnx',
        retry: true
    });

    client.get({ endpoint: 'news', limit: 5 })
        .then((res) => {
            res.contents.forEach((item, index) => {
                const titleElement = document.querySelector(`#title${index + 1}`);
                if (titleElement) {
                    categoryname = item.category.name;
                    titlename = item.title;
                    titleElement.textContent = "[" + categoryname + "]" + titlename;

                    if (item.title.trim().length > 0) {
                        titleElement.style.display = "list-item";
                    }

                    titleElement.addEventListener('click', () => {
                        const outputElement = document.getElementById('output');
                        outputElement.style.height = "100%"
                        outputElement.style.opacity = "1";
                        outputElement.style.transition = "all 0.5s 0s ease-in-out";
                        outputElement.style.visibility = "visible";
                        const originalDateString = item.publishedAt;
                        const originalDate = new Date(originalDateString);

                        const year = originalDate.getFullYear();
                        const month = originalDate.getMonth() + 1; // 月は0から始まるため、1を加えます
                        const day = originalDate.getDate();

                        const formattedDate = `${year}年${month}月${day}日`;

                        // ID と HTML タグを保ったまま表示
                        outputElement.innerHTML = `<div class="outputindiv"><div><span class="output-span">ID: ${item.id}</span><span class="output-span">　公開日: ${formattedDate}</span></div><button onclick="hideDiv()" class="output-close"><img src="assets/img/close.svg" class="output-close-img"></img></button></div>${item.content}<button onclick="hideDiv()" class="output-close-end"><img src="assets/img/close.svg" class="output-close-img-end"></img>閉じる</button>`
                    });
                }
            });
        })
        .catch((err) => console.error(err));
});