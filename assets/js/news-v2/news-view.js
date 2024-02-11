﻿document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const contentsParam = urlParams.get('contents');
    if (contentsParam) {
        fetch(`./api/${contentsParam}`)
            .then(response => response.json())
            .then(data => {
                categoryname = data.category.name;
                titlename = data.title;

                const outputElement = document.getElementById('output');
                const originalDateString = data.publishedAt;
                const originalDate = new Date(originalDateString);

                const year = originalDate.getFullYear();
                const month = originalDate.getMonth() + 1; // 月は0から始まるため、1を加えます
                const day = originalDate.getDate();

                const formattedDate = `${year}\u5e74${month}\u6708${day}\u65e5`;

                // ID と HTML タグを保ったまま表示
                outputElement.innerHTML = `<div class="outputindiv"><div><span class="output-span">ID: ${data.id}</span><span class="output-span">\u3000\u516c\u958b\u65e5: ${formattedDate}</span></div><button onclick="hideDiv()" class="output-close"><img src="assets/img/close.svg" class="output-close-img"></img></button></div>${data.content}<button onclick="hideDiv()" class="output-close-end"><img src="assets/img/close.svg" class="output-close-img-end"></img>閉じる</button>`

            })
            .catch((error) => {
                console.error(error);
                alert("\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u000a\u3057\u3070\u3089\u304f\u5f85\u3063\u3066\u304b\u3089\u518d\u5ea6\u30a2\u30af\u30bb\u30b9\u3057\u3066\u304f\u3060\u3055\u3044\u3002")
                window.location.href = 'newslist.html';
            });
    } else {
        window.location.href = 'newslist.html';
    }

});
