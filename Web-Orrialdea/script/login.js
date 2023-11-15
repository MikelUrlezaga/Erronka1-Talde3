document.cookie = "AdminUser=" + "NoLoged" + "; path=/";
contFallo = 0;
cronoTime = 0;
pausa;
function vernover() {
    if ((document.getElementById("ojo").src).includes("ojo1")) {
        document.getElementById("ojo").src = "../../IMG/ojo2.png"
        document.getElementById("pass").type = "password"
    } else {
        document.getElementById("ojo").src = "../../IMG/ojo1.png"
        document.getElementById("pass").type = "text"
    }
    
}

function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        login()
    }
}

function login() {
    if (contFallo>2) {
        cronoTime = cronoTime + 30;
    } else {
        var name = document.getElementById("user").value
        var caracteres = /^[a-zA-Z0-9]+$/
        if (caracteres.test(name)) {
            loginComp()
        } else {
            document.getElementById("user").style.borderColor = "red"
            document.getElementById("mal").removeAttribute("hidden")
            document.getElementById("mal").innerHTML = "Erabiltzailea_ezin_du_karaktere_arraroak_eduki"
        }
    }
}


/* 
var caracteres = /^[a-zA-Z0-9]+$/

^ indica el inicio de la cadena.
[a-zA-Z0-9] define el rango de letras (minúsculas y mayúsculas) y números.
+ significa que debe haber al menos un carácter.
$ indica el final de la cadena.
*/

function loginComp() {
    var erabiltzailea = document.getElementById("user").value;
    var pasahitza = document.getElementById("pass").value;
    var erabpass = {erabiltzailea, pasahitza};
    var js = JSON.stringify(erabpass);
    console.log(js);
    fetch(rutaBack + 'logina.php', {method: 'POST', body: js, mode: 'cors', headers: {'Content-Type': 'application/json'}})
    .then(response => {
        console.log(response);
        return response.text();
    })
    .then(data=>{
        console.log("data: " + data);
        var myArray=data.split(",");
        if (myArray[0].match("Erabiltzailea_eta_pasahitza_ondo_sartuta_daude")) {
                window.location ="../../HTML/Orokorra/Home.html";
                document.cookie = "AdminUser=" + myArray[1] + "; path=/";
            }else if(myArray[0].match("Pasahitza_txarto_sartuta_dago")){
                document.getElementById("user").style.borderColor = "#ccc"
                document.getElementById("pass").style.borderColor = "red"
                document.getElementById("mal").removeAttribute("hidden")
                document.getElementById("mal").innerHTML = "Pasahitza_txarto_sartuta_dago"
                contFallo++;
            }else if(myArray[0].match("Erabiltzailea_ez_da_existitzen")){
                document.getElementById("user").style.borderColor = "red"
                document.getElementById("mal").removeAttribute("hidden")
                document.getElementById("mal").innerHTML = "Erabiltzailea_ez_da_existitzen"
                contFallo++;
            }
            if(data.match("Fatal error")){
                alert("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu");
            }
            if (contFallo>2) {
                cronoTime = 30;
                crono();
                pausa = setInterval(crono,1000);
            } 
        })
        .catch(error => {
            console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu: " + error);
        });
}
function crono () {
    cronoTime--;
    document.getElementById("mal").innerHTML = "Itxaroteko denbora: "+cronoTime+"s";
    if (cronoTime == 0) {
        contFallo = 0;
        clearInterval(pausa);
    }
}