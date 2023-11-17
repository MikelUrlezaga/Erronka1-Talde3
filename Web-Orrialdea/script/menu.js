/**
 * @type {boolean}
 * Variable que indica si el menú está abierto o cerrado.
 */
var a = true;
// Insertar menu
/**
 * @function insertarMenu
 * @description Inserta el menú en el elemento con el ID "menuMugikorra".
 */
fetch('../../HTML/Orokorra/Menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('menuMugikorra').innerHTML = data;
                if (obtenerCookie().match("A")) {
                    document.getElementById("menuErab").hidden = false
                }else if(obtenerCookie().match("NoLoged")){
                    window.location = "HTML/Orokorra/Login.html"
                }else{
                    document.getElementById("menuErab").hidden = true
                }
            });

/**
 * @function menuopenclose
 * @description Abre o cierra el menú y ajusta la visibilidad del fondo negro.
 */
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
/**
 * @function obtenerCookie
 * @description Obtiene el valor de la cookie "AdminUser".
 * @returns {string} El valor de la cookie "AdminUser" o "NoLoged" si no está presente.
 */
function obtenerCookie() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("AdminUser=")) {
            return cookie.substring("AdminUser=".length, cookie.length);
        }
    }
    return "NoLoged";
}

