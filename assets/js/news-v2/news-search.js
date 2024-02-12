const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get('q');

document.addEventListener("DOMContentLoaded", function () {
    const clearBtn = document.getElementById("clear-btn");
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");

    searchInput.value = `${q}`;
    // Clear input value when clear button is clicked
    clearBtn.addEventListener("click", function () {
        searchInput.value = '';
    });

    // Redirect to search page with input value when search button is clicked
    searchBtn.addEventListener("click", function () {
        const searchValue = searchInput.value.trim();
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('q', searchValue);
        window.history.pushState({}, '', currentUrl);
    });
});