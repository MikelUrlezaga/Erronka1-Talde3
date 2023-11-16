function fechaActual() {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; 
    const anio = hoy.getFullYear();

    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    document.getElementById("hasieraDataTxertatu").value = fechaFormateada;
    document.getElementById("amaieraDataTxertatu").value = fechaFormateada;
}

window.addEventListener("load", fechaActual);

function teclado(event) {
var codigo = event.which || event.keyCode;
if (codigo==13) {
    createKokalekua()
}
}
async function bistaratuFromPHPTxertatu() {
    let options = {method: "GET", mode: 'cors'};
    const da = null;
    fetch(rutaBack + "inbentarioa_json.php", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data);
            console.log(data.length);
            var opElement = document.createElement("option");
            opElement.value = "Nada";
            opElement.innerText="Aukeratu bat";
            document.getElementById("selectEki").appendChild(opElement);

            for(i=0; i < data.length; i++){
                var opElement = document.createElement("option");
                opElement.value = data[i].etiketa;
                opElement.innerText=data[i].etiketa+" - "+data[i].marka+" "+data[i].modelo;
                document.getElementById("selectEki").appendChild(opElement);
            }
        })
        .catch(error => {
            alert("Errorea." + error);
        });


        fetch(rutaBack + "gelak_json.php", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data);
            console.log(data.length);
            var opElemento = document.createElement("option");
            opElemento.value = "Nada";
            opElemento.innerText="Aukeratu bat";
            document.getElementById("selectGela").appendChild(opElemento);

            for(i=0; i < data.length; i++){
                var opElemento = document.createElement("option");
                opElemento.value = data[i].id;
                opElemento.innerText=data[i].id+" - "+data[i].izena;
                document.getElementById("selectGela").appendChild(opElemento);
            }
        })
        .catch(error => {
            alert("Errorea." + error);
        });
}


window.addEventListener("load", bistaratuFromPHPTxertatu);
function createKokalekua() {
    var etiketa = document.getElementById("selectEki").value;
    var idGela = document.getElementById("selectGela").value;
    var hasieraData = document.getElementById("hasieraDataTxertatu").value;
    var amaieraData = document.getElementById("amaieraDataTxertatu").value;

    if(etiketa == "Nada" || idGela == "Nada"){
        alert("Daturen bat falta zaizu.");
    }else{
        var clasea = {etiketa, idGela, hasieraData, amaieraData};
        var js = JSON.stringify(clasea);
        console.log(js);
        fetch(rutaBack + 'kokalekuak_json.php', {method: 'POST', body: js})
            .then(function (response) {
                    return response.text();
            })
            .then(data=>{
                console.log(data);
                if(data.match("Hasierako")){
                    alert("Hasierako data amaierakoa baino handiagoa da.");
                }else if (data.match("ez dago libre")){
                    alert("Ekipamendu hau ez dago libre data honetarako.");
                }else{
                    alert(etiketa+"-ren erreserba txertatuta");
                }
            })
            .catch(error => {
                console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
            });
        }
}