/**
 * Kookie bat jaso eta itzultzen du.
 * @function
 * @returns {string} Kookie bat.
 */
console.log(obtenerCookie())

/**
 * Kookie bat "B" karakterea duen ala ez aztertzen du eta baimenik ez badu,
 * logineko orrira berbideratzen du. Bestela, "NoLoged" duen ala ez aztertzen
 * du eta baimenik ez badu, logineko orrira berbideratzen du.
 * @function
 */
if (obtenerCookie().match("B")) {
    window.location = "http://www.talde3.edu/HTML/Orokorra/Login.html"
}else if(obtenerCookie().match("NoLoged")){
    window.location = "http://www.talde3.edu/HTML/Orokorra/Login.html";
}

/**
 * Teklatuaren teklak hartzen ditu eta "Enter" sakatzen bada,
 * "actuErabiltzailea" funtzioa deitzen du.
 * @function
 * @param {Event} event - Teklatuaren teklak.
 */
function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        actuErabiltzailea()
    }
}
/**
 * URL-an dauden parametroak kudeatzen dituen kode blokea.
 */
var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split("&");
var params = {};
var gureNan = 0;

/**
 * URLaren parametroak hartzen ditu eta "gureNan" aldagaian gorde.
 * @type {Object}
 */
for (var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
    gureNan = tmparr[1];
}
/**
 * Hautatutako erabiltzailearen datuak erakutsi ahal izateko "gureNan" aldagaia
 * gordetzen du.
 * @function
 */
function aldatuErabiltzaile() {
    var NanUsuario = document.getElementById("selectore").value;
    gureNan = NanUsuario;
    cargarDatosUsuario(gureNan);
}
/**
 * Orriaren kargatzean exekutatzen den funtzioa.
 */
window.addEventListener("load", cargarOpcionesSelectUsuarios);
/**
 * Orria kargatzen denean "gureNan" aldagaia erabiliz "cargarDatosUsuario"
 * funtzioa deitzen du.
 * @event
 */
window.addEventListener("load", cargarDatosUsuario(gureNan));

/**
 * Erabiltzaileen datuak kargatzen dituen funtzioa.
 */
async function cargarOpcionesSelectUsuarios() {
let options = {method: "GET"};
fetch(rutaBack + "erabiltzailea_json.php", options)
    .then(response => response.json())  // Analiza la respuesta JSON
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            console.log(gureNan);
            if(data[i].nan==gureNan){
                console.log("Entra "+gureNan);
            }
            var opcion="<option value='"+data[i].nan+"'>"+data[i].izena+"</option>";
            var opElement = document.createElement("option");
            opElement.innerHTML = opcion;
            opElement.value = data[i].nan;
            if(data[i].nan==gureNan){
                opElement.selected="selected";
            }
            
            document.getElementById("selectore").appendChild(opElement);
        }
    })
    .catch(error => {
        alert("Errorea." + error);
    });
}
/**
 * Erabiltzailearen datuak kargatzen dituen funtzioa.
 * @param {number} gureNan - Erabiltzailearen NAN zenbakia.
 */
function cargarDatosUsuario(gureNan) {
    console.log("Ha entrado")
    let options = {method: "GET"};
    fetch(rutaBack + "erabiltzailea_json.php?num="+gureNan+"", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data + " jhhhjh");
            console.log(data.length);
            document.getElementById("nanEraEgu").value=data[0].nan;
            document.getElementById("izenaEraEgu").value=data[0].izena;
            document.getElementById("abizenaEraEgu").value=data[0].abizena;
            document.getElementById("erabiltzaileaEraEgu").value=data[0].erabiltzailea;
            document.getElementById("pasahitzaEraEgu").value=data[0].pasahitza;
            document.getElementById("dniAntiguo").style.visibility="visible";
            document.getElementById("dniAntiguo").value=data[0].nan;
            document.getElementById("dniAntiguo").style.visibility="hidden";
            
            if (data[0].rola == "A") {
                document.getElementById("rolaEraEgu").checked = true
            }else{
                document.getElementById("rolaEraEgu").checked = false
            }
            document.getElementById("selectore").value=gureNan;
            //document.getElementsByClassName("titulo").innerHTML= data[0].izena + " Erabiltzailea eguneratu";
        })
        .catch(error => {
            alert("Errorea." + error);
        });

}

/**
 * Erabiltzailearen datuak eguneratzen dituen funtzioa.
 */
function actuErabiltzailea() {
    var nan = document.getElementById("nanEraEgu").value;
    var izena = document.getElementById("izenaEraEgu").value;
    var abizena = document.getElementById("abizenaEraEgu").value;
    var erabiltzailea = document.getElementById("erabiltzaileaEraEgu").value;
    var pasahitza = document.getElementById("pasahitzaEraEgu").value;
    document.getElementById("dniAntiguo").style.visibility="visible";
    var aurrekoNan = document.getElementById("dniAntiguo").value;
    document.getElementById("dniAntiguo").style.visibility="hidden";
    if (document.getElementById("rolaEraEgu").checked) {
        var rola = "A";
    } else {
        var rola = "B";
    }
    var erabil = { nan, izena, abizena, erabiltzailea, pasahitza, rola, aurrekoNan };
    var js = JSON.stringify(erabil);
    console.log(js);
    fetch(rutaBack + 'erabiltzailea_json.php', { method: 'PUT', body: js })
        .then(function (response) {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if(data.match("NAN hau erabiltzen ari da")){
                alert("NAN hau erabiltzen ari da.");
            }else if(data.match("NAN hau txarto dago")){
                alert("NAN hau txarto dago");
            }
        });
}
/**
 * Pasahitza ikusteko edo ezkutatzeko botoia sakatzean gertatzen dena kudeatzen duen funtzioa.
 */
function vernover() {
    if ((document.getElementById("ojo").src).includes("ojo1")) {
        document.getElementById("ojo").src = "../../IMG/ojo2.png"
        document.getElementById("pasahitzaEraEgu").type = "password"
    } else {
        document.getElementById("ojo").src = "../../IMG/ojo1.png"
        document.getElementById("pasahitzaEraEgu").type = "text"
    }
    
}
