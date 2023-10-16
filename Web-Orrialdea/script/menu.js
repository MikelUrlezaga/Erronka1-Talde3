var a = true;
// Insertar menu
fetch('../HTML/Menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('menuMugikorra').innerHTML = data;
            });

function menuopenclose () {
    var menu = document.getElementById("menu")
    var fondoN = document.getElementById("negro")
        if (a) {
            fondoN.hidden = false
            setTimeout(function() {
                menu.classList = "animateM"
                fondoN.classList = "animateFN"
            }, 0);
            
        } else{
            menu.classList = "animateMClose"
            fondoN.classList = "animateFNClose"
            setTimeout(function() {
                // Quita el atributo hidden
                fondoN.hidden = true
              }, 500);
        }
        a = !a;
}


