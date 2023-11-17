/**
 * Gelak bistaratzeko funtzioa. 
 * 
 * @async
 * @function
 * @returns {Promise<void>} - Promise objektua.
 */
async function bistaratuFromPHP() {
    let options = {method: "GET", mode: 'cors'};
    const da = null;
    document.getElementById("tabla").innerHTML="";
    fetch(rutaBack + "gelak_json.php", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data);
            console.log(data.length);
            document.getElementById("selector").innerHTML = "";
            // Aukeratzeko dropdown elementua sortu
                var opElement = document.createElement("option");
                opElement.value = "Nada";
                opElement.innerText="Aukeratu bat";
                document.getElementById("selector").appendChild(opElement);
                // Gelak taulan bistaratu
            for(i=0; i < data.length; i++){
                var tableRow="<tr></tr>";
                tableRow = tableRow.substring(0,tableRow.length-5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" + 
                data[i].id +"'>" +"</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].id + "</td>" +
                tableRow.substring(tableRow.length-5) + "<td>" + data[i].izena + "</td>" 
                + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].taldea + "</td>";

                var trElement = document.createElement("tr");
                trElement.innerHTML = tableRow;
                document.getElementById("tabla").appendChild(trElement);

                // Aukeratzeko dropdowna bete
                var opElement = document.createElement("option");
                opElement.value = data[i].id;
                opElement.innerText=data[i].izena;
                document.getElementById("selector").appendChild(opElement);
            }
        })
        .catch(error => {
            alert("Taula ez dauka daturik db-an");
        });
    
}
window.addEventListener("load", bistaratuFromPHP);
/**
 * Kargatu diren checkbox-en id-ak lortzen dituen funtzioa
 * @returns {string[]} - Checkbox-en id-ak dituen array-a
 */
function lortuCheck() {
    var checkboxes = document.querySelectorAll('input[name="c"]:checked');//De nuestro documento comprueba los inputs con nombre c
    var ids = [];//Creamos el array para nuestras ids

    checkboxes.forEach(function(checkbox) { //Aqui lo que hacemos es que de los elementos checkbox de nuestro programa 
        ids.push(checkbox.id);              //mire los que estan checked y agarre sus ids para meterlas en un array previamente
                                            //creado
    });
    
    return ids;
}
/**
 * Editatu botoia blokeatzeko edo desblokeatzeko funtzioa
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
 * Ziur zaude ezabatu nahi duzula konfirmatzeko funtzioa
 */
function checkZiur()
{
    if (confirm("Ziur zaude hau ezabatu nahi duzula?")){
        deleteGela();
    }else{}
    
}
/**
 * Gela bat ezabatzeko funtzioa
 */
function deleteGela() {
    var ids = lortuCheck();
    var js = JSON.stringify(ids);
    console.log(js);
    fetch(rutaBack + 'gelak_json.php', {method: 'DELETE', body: js, mode: 'cors'})
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
 * Gela bat editatzeko orria kargatzeko funtzioa
 */
function editaGela(){
    $id=lortuCheck();
    numero=$id[0];
    window.location="Eguneratu.html?num="+numero+"";
}
/**
 * Gela bat txertatzeko orria kargatzeko funtzioa
 */
function txertatuGela(){
    window.location="Txertatu.html";
}
/**
 * Aukeratutako gela bat editatzeko funtzioa
 */
function aldatuGela(){
    var idclase = document.getElementById("selector").value;
    if(idclase.match("Nada")){
        bistaratuFromPHP();
    }else{
        bistaratuFromPHP2(idclase);
    }
}
/**
 * Aukeratutako gela bat bistaratzeko funtzioa
 * @param {string} gureNan - Bistaratzeko aukeratutako gelaren identifikadorea
 */
function bistaratuFromPHP2(gureNan) {
        console.log("Ha entrado")
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "gelak_json.php?num="+gureNan+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("tabla").innerHTML="";
                
                for(i=0; i < data.length; i++){
                        var tableRow="<tr></tr>";
                        tableRow = tableRow.substring(0,tableRow.length-5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" + 
                        data[i].id +"'>" +"</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].id + "</td>" +
                        tableRow.substring(tableRow.length-5) + "<td>" + data[i].izena + "</td>" 
                        + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].taldea + "</td>";

                        var trElement = document.createElement("tr");
                        trElement.innerHTML = tableRow;
                        document.getElementById("tabla").appendChild(trElement);

                    }
            })
            .catch(error => {
                alert("Taula ez dauka daturik db-an");
            });

    }
