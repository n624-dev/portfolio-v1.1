function hideDiv() {
    const outputElement = document.getElementById('output');
    outputElement.style.opacity = 0;
    outputElement.style.visibility = "hidden";
    outputElement.style.transition = "all 0.5s 0s ease-in-out";
    outputElement.style.height = "0px"
}