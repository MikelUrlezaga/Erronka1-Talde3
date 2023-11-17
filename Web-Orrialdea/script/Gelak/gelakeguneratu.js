/**
 * Tecladoko tekla batekin ekintza egin behar den funtzioa. 
 * Enter tekla (kodea 13) sakatzean "actuGela" funtzioa deituko da.
 * @param {KeyboardEvent} event - Tekla sakatzean jasotako eventua.
 */
function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        actuGela()
    }
}
/**
 * URL-aren parametroak parseatu eta "nuestraId" aldagai globala bete.
 */
var paramstr = window.location.search.substr(1);
console.log(window.location.search.substr(1));
var paramarr = paramstr.split ("&");
var params = {};
var nuestraId=0;

for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
    console.log(tmparr[1]);
    nuestraId=tmparr[1];
}
/**
 * Aukeratutako gela baten datuak kargatzen dituen funtzioa.
 * @param {string} idcls - Aukeratutako gela baten identifikadorea.
 */
async function bistaratuFromPHP2(idcls) {
    console.log("Ha entrado")
    let options = {method: "GET", mode: 'cors'};
    fetch(rutaBack + "gelak_json.php?num="+idcls+"", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data);
            console.log(data.length);
            document.getElementById("izenaGelakEgu").value=data[0].izena;
            document.getElementById("taldeaGelakEgu").value=data[0].taldea;
            document.getElementById("selectore").value=idcls;
            document.getElementById("titulo").innerText= data[0].izena + " Gela eguneratu";
        })
        .catch(error => {
        });
}
/**
 * "Nada" aukeratuta dagoenean "bistaratuFromPHP" funtzioa deituko du.
 * Bestela, "bistaratuFromPHP2" funtzioa deituko da "selectore" elementuko balioarekin.
 */
function aldatuGela(){
    
    var ide = document.getElementById("selectore").value;
    if(ide.match("Nada")){
        bistaratuFromPHP();
    }else{
        bistaratuFromPHP2(ide);
    }
}
/**
 * "selectore" elementuko balioaren arabera gelak bistaratzen dituen funtzioa.
 * @async
 */
async function bistaratuFromPHP() {
    let options = {method: "GET", mode: 'cors'};
    fetch(rutaBack + "gelak_json.php",options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                console.log(nuestraId);
                if(data[i].id==nuestraId){
                    console.log("Entra "+nuestraId);
                }
                var opcion="<option value='"+data[i].id+"'>"+data[i].izena+"</option>";
                var opElement = document.createElement("option");
                opElement.innerHTML = opcion;
                opElement.value = data[i].id;
                if(data[i].id==nuestraId){
                    opElement.selected="selected";
                }
                document.getElementById("selectore").appendChild(opElement);
            }
        })
        .catch(error => {
        });
}

window.addEventListener("load", bistaratuFromPHP);
window.addEventListener("load", bistaratuFromPHP2(nuestraId));
/**
 * Gela baten datuak eguneratzen dituen funtzioa. 
 * "selectore" elementuko balioa, "izenaGelakEgu" eta "taldeaGelakEgu" input-en balioak erabiliz.
 */
function actuGela() {
    //
    var id = document.getElementById("selectore").value;
    var izena = document.getElementById("izenaGelakEgu").value;
    var taldea = document.getElementById("taldeaGelakEgu").value;
    var clasea = {id,izena,taldea};
    var js = JSON.stringify(clasea);
    console.log(js);
    let count=0;
    let options = {method: "GET", mode: 'cors'};
    fetch(rutaBack + "gelak_json.php",options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                if(data[i].izena == izena){
                    count++;
                }
            }
            console.log(count);

            if(count==1 || count==0){
                var clasea = {izena, taldea};
                var js = JSON.stringify(clasea);
                console.log(js);
                if (id == "Aukeratu bat" || izena == "" || taldea == "" || (izena.length)>4) {
                alert("Datuak ondo zartuta daudela zihurtatu");
            }else{
                fetch(rutaBack + 'gelak_json.php', {method: 'PUT', body: js, mode: 'cors'})
                .then(function (response) {
                        return response.text();
                })
                .then(data=>{
                    console.log(data);
                    if(data.includes("Data too long")){
                        alert("Gelaren izena oso luzea da. Gehienez 4 karaktere izan ditzake.")
                    }
                    
                })
                // .catch(error => {
                //     //console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                // });
            }
            }else{
                alert("Beste gela bat dago izen horrekin")
            }
                })
                .catch(error => {
                    console.log(error)
                });
}