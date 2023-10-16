var a = 0;
// Insertar menu
fetch('../HTML/Menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('menuMugikorra').innerHTML = data;
            });

function menuopenclose () {
    var menu = document.getElementById("menu")
    
        if (a) {
            menu.classList = "animate";
            menu.style.left = "0px";
        } else{
            menu.classList.add("animateClose");
            menu.style.left = "-300px";
        }
        a = !a;
}


