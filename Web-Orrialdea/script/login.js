document.cookie = "AdminUser=" + "NoLoged" + "; path=/";

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
    var name = document.getElementById("user").value
    var caracteres = /^[a-zA-Z0-9]+$/
    if (caracteres.test(name)) {
        loginComp()
    } else {
        document.getElementById("mal").removeAttribute("hidden")
        document.getElementById("mal").innerHTML = "Erabiltzailea_eta_pasahitza_txarto_sartuta_daude"
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
    fetch(rutaBack + 'logina.php', {method: 'POST', body: js})
        .then(function (response) {
                return response.text();
        })
        .then(data=>{
            console.log(data);
            var myArray=data.split(",");
            if (myArray[0].match("Erabiltzailea_eta_pasahitza_ondo_sartuta_daude")) {
                window.location ="../../HTML/Orokorra/Home.html";
                document.cookie = "AdminUser=" + myArray[1] + "; path=/";
            }else if(myArray[0].match("Pasahitza_txarto_sartuta_dago")){
                document.getElementById("mal").removeAttribute("hidden")
                document.getElementById("mal").innerHTML = "Pasahitza_txarto_sartuta_dago"
            }else if(myArray[0].match("Erabiltzailea_ez_da_existitzen")){
                document.getElementById("mal").removeAttribute("hidden")
                document.getElementById("mal").innerHTML = "Erabiltzailea_ez_da_existitzen"
            }
            if(data.match("Fatal error")){
                alert("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu");
            }
        })
        // .catch(error => {
        //     //console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        // });
}