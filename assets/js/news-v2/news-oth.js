function hideDiv() {
    console.log(history.length);
    if (window.history.length > 1) {
        window.history.back();
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const draftKey = urlParams.get('draftKey');
        if (draftKey !== undefined && draftKey !== null) {
            window.location.href = `newslist?${draftKey}`;
        } else {
            window.close();
            window.location.href = `newslist`;
        }
    }
}

function home() {
    window.location.href = 'index.html';
}
