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
    fetch('../../PHP/logina.php', {method: 'POST', body: js})
        .then(function (response) {
                return response.text();
        })
        .then(data=>{
            console.log(data);
            if (data.match("Erabiltzailea_eta_pasahitza_ondo_sartuta_daude")) {
                window.location.href = "../../HTML/Orokorra/Home.html";
            }else{
                document.getElementById("mal").removeAttribute("hidden")
            }
            if(data.match("Fatal error")){
                alert("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu");
            }
        })
        // .catch(error => {
        //     //console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        // });
}