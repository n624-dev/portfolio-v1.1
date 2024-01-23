function hideDiv() {
    console.log(history.length);
    if (window.history.length >= 1) {
        window.history.back();
    } else {
        window.close();
        window.location.href = 'newslist.html';
    }
}

function home() {
    window.location.href = 'index.html';
}
