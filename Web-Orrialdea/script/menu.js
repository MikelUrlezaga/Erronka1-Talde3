var a = true;
var xd = 0;
// Insertar menu
fetch('../Orokorra/Menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('menuMugikorra').innerHTML = data;
                if (obtenerCookie().match("A")) {
                    document.getElementById("menuErab").hidden = false
                }else{
                    document.getElementById("menuErab").hidden = true
                }
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

function obtenerCookie() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("AdminUser=")) {
            return cookie.substring("AdminUser=".length, cookie.length);
        }
    }
    return null;
}