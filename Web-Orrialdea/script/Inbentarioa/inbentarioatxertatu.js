/**
 * Funtzio honek uneko data eta ordua hartu eta formatu egokian itzultzen du.
 * Data formatua: 'YYYY-MM-DD'.
 */
function fechaActual() {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; 
    const anio = hoy.getFullYear();

    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    document.getElementById("erosDataInbentarioaTxertatu").value = fechaFormateada;
    console.log(fechaFormateada);
}
// Orrialdea kargatzean "fechaActual" funtzioa exekutatzen da.
window.addEventListener("load", fechaActual);
/**
 * Funtzio honek teklatuko "Enter" tekla sakatzean "createInbentarioa" funtzioa deitzen du.
 * @param {Event} event - Teklatuaren sarrera eventua.
 */
function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        createInbentarioa()
    }
}
/**
 * Ekipamenduak kargatzeko funtzioa.
 */
function cargarEkipamendua(){
    let options = {
        method: "GET",
        mode: 'cors'
    };
    fetch(rutaBack + "ekipamendua_json.php", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data);
            console.log(data.length);
            for (i = 0; i < data.length; i++) {
                var opElement = document.createElement("option");
                opElement.value = data[i].id;
                opElement.innerText = data[i].marka +" "+data[i].modelo;
                document.getElementById("selecTxertatu").appendChild(opElement);
            }
        })
        .catch(error => {
            alert("Errorea." + error);
        });
}
/**
 * Stock-a gehitzeko funtzioa.
 */
function gehituStock(){
    var etiketa = document.getElementById("etiketaInbentarioaTxertatu").value;
    var idEkipamendu = document.getElementById("selecTxertatu").value;
    var erosketaData = document.getElementById("erosDataInbentarioaTxertatu").value;
    var gehitu = "bai";
    var clasea = {etiketa, idEkipamendu, erosketaData,gehitu};
    var js = JSON.stringify(clasea);
    console.log(js);
    if (idEkipamendu == "Aukeratu bat" || etiketa == "" || new Date(erosketaData) >  new Date()) {
        alert("Datuak ondo zartuta daudela zihurtatu");
    }else{
        fetch(rutaBack + 'inbentarioa_json.php', {method: 'POST', body: js})
            .then(function (response) {
                    return response.text();
            })
            .then(data=>{
                console.log(data);
                if(data.match("No hay stock suficiente")){
                    
                }

                //AQUÍ UN WINDOW PROMPT DEL STOCK DISPONIBLE DE ESE EKIPAMENDU
            })
            .catch(error => {
                console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
            });
    }
}
// Orrialdea kargatzean "cargarEkipamendua" funtzioa exekutatzen da. 
window.addEventListener("load", cargarEkipamendua);
/**
 * Inbentarioa sortzeko funtzioa.
 */
function createInbentarioa() {
    var etiketa = document.getElementById("etiketaInbentarioaTxertatu").value;
    var idEkipamendu = document.getElementById("selecTxertatu").value;
    var erosketaData = document.getElementById("erosDataInbentarioaTxertatu").value;
    var clasea = {etiketa, idEkipamendu, erosketaData};
    var js = JSON.stringify(clasea);
    console.log(js);
    fetch(rutaBack + 'inbentarioa_json.php', {method: 'POST', body: js, mode: 'cors'})
        .then(function (response) {
                return response.text();
        })
        .then(data=>{
            console.log(data);
            if(data.match("No hay stock suficiente")){
                if(confirm("No puedes insertar más stock. Deseas añadir?")){
                    gehituStock();
                }else{

                }
                alert(etiketa + " txertatuta");
            }
            //AQUÍ UN WINDOW PROMPT DEL STOCK DISPONIBLE DE ESE EKIPAMENDU
        })
        .catch(error => {
            console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        });
}

