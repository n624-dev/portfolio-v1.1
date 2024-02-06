const { createClient } = microcms;

document.addEventListener("DOMContentLoaded", function () {
    const client = createClient({
        serviceDomain: 'n624',
        apiKey: 'uNzMJ5Va607OeMOEb5vDhjRtSiG4v5eQ0xnx',
        retry: true
    });
    const urlParams = new URLSearchParams(window.location.search);
    const contentsParam = urlParams.get('contents');
    if (contentsParam) {
        client.get({ endpoint: `news/${contentsParam}` })
            .then((res) => {
                categoryname = res.category.name;
                titlename = res.title;

                const outputElement = document.getElementById('output');
                const originalDateString = res.publishedAt;
                const originalDate = new Date(originalDateString);

                const year = originalDate.getFullYear();
                const month = originalDate.getMonth() + 1; // 月は0から始まるため、1を加えます
                const day = originalDate.getDate();

                const formattedDate = `${year}\u5e74${month}\u6708${day}\u65e5`;

                // ID と HTML タグを保ったまま表示
                outputElement.innerHTML = `<div class="outputindiv"><div><span class="output-span">ID: ${res.id}</span><span class="output-span">\u3000\u516c\u958b\u65e5: ${formattedDate}</span></div><button onclick="hideDiv()" class="output-close"><img src="assets/img/close.svg" class="output-close-img"></img></button></div>${res.content}<button onclick="hideDiv()" class="output-close-end"><img src="assets/img/close.svg" class="output-close-img-end"></img>閉じる</button>`

            })
            .catch((err) => {
                console.error(err);
                window.location.href = 'newslist.html';
            });
    } else {
        window.location.href = 'newslist.html';
    }

});
