function menuopenclose () {
    var menu = document.getElementById("menu")
    if (menu.hidden) {
        menu.hidden = false
        document.getElementById("negro").hidden = false
    } else {
        menu.hidden = true
        document.getElementById("negro").hidden = true
    }  
}