document.addEventListener("DOMContentLoaded", function() {
    var menuButton = document.getElementById("menuButton");
    var closeButton = document.getElementById("closeButton");
    var dropdown = document.querySelector(".dropdown");

    menuButton.addEventListener("click", function() {
        dropdown.classList.toggle("active");
    });
    closeButton.addEventListener("click", function() {
        dropdown.classList.remove("active");
    });
});