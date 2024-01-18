function hideDiv() {
    if (window.history.length >= 1) {
        history.back();
    } else {
        window.close();
    }
}