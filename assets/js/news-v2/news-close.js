function hideDiv() {
    console.log(history.length);
    if (window.history.length >= 1) {
        window.history.back();
    } else {
        window.location.href = 'newslist.html';
    }
}
