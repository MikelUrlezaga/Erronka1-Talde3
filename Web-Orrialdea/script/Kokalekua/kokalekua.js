/**
 * PHP-tik datuak eskuratzen dituen funtzioa. 
 * Kokaleku guztiak bistaratzen ditu.
 */
async function bistaratuFromPHP() {
    let options = {method: "GET", mode: 'cors'};
    const da = null;
    fetch(rutaBack + "kokalekuak_json.php", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data);
            console.log(data.length);
            document.getElementById("tabla").innerHTML="";
            document.getElementById("selector").innerHTML = "";
            var opElement = document.createElement("option");
            opElement.value = "Nada";
            opElement.innerText="Elige una opcion";
            document.getElementById("selector").appendChild(opElement);

            for(i=0; i < data.length; i++){
                var tableRow="<tr></tr>";
                tableRow = tableRow.substring(0,tableRow.length-5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" + 
                    data[i][1] + "'>" + "</td>"+
                tableRow.substring(tableRow.length-5) + "<td>" +data[i][0]+"</td>" + 
                tableRow.substring(tableRow.length-5) + "<td>" + data[i][2] + " " + data[i][3] + "</td>" +
                tableRow.substring(tableRow.length-5) + "<td>" + data[i][4] + "</td>" +
                tableRow.substring(tableRow.length-5) + "<td>" + data[i][5] + "</td>" +
                tableRow.substring(tableRow.length-5) + "<td>" + data[i][6] + "</td>";
                

                var trElement = document.createElement("tr");
                trElement.innerHTML = tableRow;
                document.getElementById("tabla").appendChild(trElement);

                var opElement = document.createElement("option");
                opElement.value = data[i][1];
                opElement.innerText=data[i][2]+" "+data[i][3];
                document.getElementById("selector").appendChild(opElement);
            }
        })
        .catch(error => {
            alert("Errorea." + error);
        });
    
}
// Orrialdea kargatzerakoan egingo duena
window.addEventListener("load", bistaratuFromPHP);
/**
 * Checkbox-ak aukeratu dituen funtzioa.
 * Aukeratutako checkbox kopurua eta egoera berritzea egiten du.
 */
function lortuCheck() {
    var checkboxes = document.querySelectorAll('input[name="c"]:checked');//De nuestro documento comprueba los inputs con nombre c
    var ids = [];//Creamos el array para nuestras ids

    checkboxes.forEach(function(checkbox) { //Aqui lo que hacemos es que de los elementos checkbox de nuestro programa 
        ids.push(checkbox.id);              //mire los que estan checked y agarre sus ids para meterlas en un array previamente
                                            //creado
    });
    console.log(ids)
    return ids;
}
/**
 * Checkbox kopurua eta egoera berritzea kontrolatzen duen funtzioa.
 */
function bloquearEdit(){
    var ids = lortuCheck();
    if(ids.length>1){
        document.getElementById("botonedit").style.visibility="hidden";
    }else{
        document.getElementById("botonedit").style.visibility="visible";
    }
}
/**
 * Aukeratutako kokalekua ezabatzeko konfirmazioa eskatzen duen funtzioa.
 * Konfirmazioan "Ziur zaude hau ezabatu nahi duzula?" mezua bistaratzen du.
 * Konfirmazioa bai edo ez kontutan hartzen du.
 */
function checkZiur()
{
    if (confirm("Ziur zaude hau ezabatu nahi duzula?")){
        deleteKokalekua();
    }else{}
}

/**
 * Aukeratutako kokalekua ezabatzen duen funtzioa.
 */
function deleteKokalekua() {
    var ids = lortuCheck();
    var js = JSON.stringify(ids);
    console.log(js);
    fetch(rutaBack + "kokalekuak_json.php", {method: 'DELETE', body: js})
        .then(function (response) {
            return response.text();
        })
        .then(data=>{
            console.log(data);
            if(data.match("Fatal error")){
                alert("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu");
            }else{
                location.reload();
            }
        })
        // .catch(error => {
        //     //console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        // });
}
/**
 * Aukeratutako kokalekua editatzeko funtzioa.
 */
function editaKokalekua(){
    $id=lortuCheck();
    console.log($id)
    numero=$id[0];
    window.location="Eguneratu.html?num="+numero+"";
}
/**
 * Kokaleku berri bat txertatzeko orri berria irekitzen duen funtzioa.
 */
function txertatuKokalekua(){
    window.location="Txertatu.html";
}
/**
 * Aukeratutako kokalekua editatzeko funtzioa.
 */
function aldatuKokalekua(){
    var ide = document.getElementById("selector").value;
    if(ide.match("Nada")){
        bistaratuFromPHP();
    }else{
        bistaratuFromPHP2(ide);
    }
    
}
/**
 * Aukeratutako kokalekua editatzeko datuak eskuratzen dituen funtzioa.
 * PHP-tik datuak eskuratzen ditu eta taula berriz marrazten du.
 */
function bistaratuFromPHP2(gureId) {
        console.log("Ha entrado")
        console.log(gureId)
        let options = {method: "GET"};
        fetch(rutaBack + "kokalekuak_json.php?num="+gureId+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("tabla").innerHTML="";
                
                for(i=0; i < data.length; i++){
                    var tableRow="<tr></tr>";
                    tableRow = tableRow.substring(0,tableRow.length-5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" + 
                    data[i].etiketa + "," + data[i].idGela +"'>" +"</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].etiketa + "</td>" +
                    tableRow.substring(tableRow.length-5) + "<td>" + data[i].ekipamendua + "</td>"
                    tableRow.substring(tableRow.length-5) + "<td>" + data[i].hasieradata + "</td>"
                    tableRow.substring(tableRow.length-5) + "<td>" + data[i].amaieradata + "</td>";

                    var trElement = document.createElement("tr");
                    trElement.innerHTML = tableRow;
                    document.getElementById("tabla").appendChild(trElement);
                }
            })
            .catch(error => {
                alert("Errorea." + error);
            });

    }