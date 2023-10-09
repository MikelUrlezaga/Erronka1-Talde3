document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const dropdown = document.querySelector(".dropdown");

    menuButton.addEventListener("click", function() {
        dropdown.classList.toggle("active");
    });
    closeButton.addEventListener("click", function() {
        dropdown.classList.remove("active");
    });
});