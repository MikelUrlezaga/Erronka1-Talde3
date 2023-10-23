var a = true;
var xd = 0;
// Insertar menu
fetch('../Orokorra/Menu.html')
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

function A () {
    xd++;
    console.log(xd)
    if(xd==50){
        document.getElementById("mysecreto").style.visibility="visible";
        document.getElementById("ellogo").style.visibility="hidden";
    }
}


