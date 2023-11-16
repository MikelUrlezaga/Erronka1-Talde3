console.log(obtenerCookie())
if (obtenerCookie().match("B")) {
    window.location = "http://www.talde3.edu/HTML/Orokorra/Login.html"
}else if(obtenerCookie().match("NoLoged")){
    window.location = "http://www.talde3.edu/HTML/Orokorra/Login.html";
}

function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        createErabiltzailea()
    }
}

 function nanOndo(nan) {
     let dni = nan;
     let error = false;

     function devuelveletra(nums) {
         const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
         const resto = nums % 23;
         return letras.charAt(resto);
     }

     dni = dni.toUpperCase();
     const lon = dni.replace(/ /g, "").length;

     if (lon !== 9 && lon !== 8) {
         console.log("Longitud del DNI incorrecta");
         error = true;
     }

     if (lon === 8) {
         const letra2 = devuelveletra(parseInt(dni.substring(0, 8), 10));
         dni = dni.substring(0, 8) + letra2;
         return dni;
     } else {
         if (lon === 9) {
             if (!isNaN(dni.substring(0, 8)) && dni.charAt(8) === devuelveletra(parseInt(dni.substring(0, 8), 10))) {
             return dni;
             } else {
                 error = true;
             }
         }
     }
     if (error) {
         return "Mal";
     }
 }

// Ejemplo de uso:
// const resultado = nanOndo("12345678A");
// console.log(resultado);

function createErabiltzailea() {
    var nan = nanOndo(document.getElementById("nanErabiltzaileaTxertatu").value);
    if(nan=="Mal"){
        alert("NAN-aren formatua txarto dago.")
    }else{
//var nancorrecto= validateDNI(nan);
        var izena = document.getElementById("izenaErabiltzaileaTxertatu").value;
        var abizena = document.getElementById("abizenaErabiltzaileaTxertatu").value;
        var erabiltzailea = document.getElementById("erabiltzaileaErabiltzaileaTxertatu").value;
        var pasahitza = document.getElementById("pasahitzaEraEgu").value;
        var rola =  leerRol();
        if(abizena=="" || izena=="" ||erabiltzailea=="" || pasahitza=="" ){
            alert("Faltan datos")
        }else{
                var clasea = {nan, izena, abizena, erabiltzailea, pasahitza, rola};
                var js = JSON.stringify(clasea);
                console.log(js);
                // if(nancorrecto==true){
                    fetch(rutaBack + 'erabiltzailea_json.php', {method: 'POST', body: js})
                    .then(function (response) {
                            return response.text();
                            alert("Se ha insertado")
                    })
                    .then(data=>{
                        console.log(data);
                        if(data.match("NAN hau txarto dago")){
                            alert("NAN hau txarto dago");
                        }else if(data.match("NAN hau erabiltzen ari da.")){
                            alert("NAN hau erabiltzen ari da.")
                        }
                    })
        }
    
    }
   
    // }else{
    //     alert("El DNI esta mal")
    // }
    
        // .catch(error => {
        //     //console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        // });
}

function vernover() {
        if ((document.getElementById("ojo").src).includes("ojo1")) {
            document.getElementById("ojo").src = "../../IMG/ojo2.png"
            document.getElementById("pasahitzaEraEgu").type = "password"
        } else {
            document.getElementById("ojo").src = "../../IMG/ojo1.png"
            document.getElementById("pasahitzaEraEgu").type = "text"
        }
        
    }

    function leerRol(){
        if( document.getElementById("rolaEraEgu").checked){
            console.log("Check");
            return "A"; 
        }else{
            console.log("No")
            return "B";
        }
           
    }