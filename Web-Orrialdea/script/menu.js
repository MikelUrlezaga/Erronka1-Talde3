var a = true;
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


