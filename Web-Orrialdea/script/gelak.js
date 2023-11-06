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
                var opElement = document.createElement("option");
                opElement.value = "Nada";
                opElement.innerText="Elige una opcion";
                document.getElementById("selector").appendChild(opElement);
            for(i=0; i < data.length; i++){
                var tableRow="<tr></tr>";
                tableRow = tableRow.substring(0,tableRow.length-5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" + 
                data[i].id +"'>" +"</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].id + "</td>" +
                tableRow.substring(tableRow.length-5) + "<td>" + data[i].izena + "</td>" 
                + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].taldea + "</td>";

                var trElement = document.createElement("tr");
                trElement.innerHTML = tableRow;
                document.getElementById("tabla").appendChild(trElement);

            
                var opElement = document.createElement("option");
                opElement.value = data[i].id;
                opElement.innerText=data[i].izena;
                document.getElementById("selector").appendChild(opElement);
            }
        })
        .catch(error => {
            alert("Errorea." + error);
        });
    
}
window.addEventListener("load", bistaratuFromPHP);

function lortuCheck() {
    var checkboxes = document.querySelectorAll('input[name="c"]:checked');//De nuestro documento comprueba los inputs con nombre c
    var ids = [];//Creamos el array para nuestras ids

    checkboxes.forEach(function(checkbox) { //Aqui lo que hacemos es que de los elementos checkbox de nuestro programa 
        ids.push(checkbox.id);              //mire los que estan checked y agarre sus ids para meterlas en un array previamente
                                            //creado
    });
    
    return ids;
}

function bloquearEdit(){
    var ids = lortuCheck();
    if(ids.length>1){
        document.getElementById("botonedit").style.visibility="hidden";
    }else{
        document.getElementById("botonedit").style.visibility="visible";
    }
}

function checkZiur()
{
    if (confirm("Ziur zaude hau ezabatu nahi duzula?")){
        deleteGela();
    }else{}
    
}

function deleteGela() {
    var ids = lortuCheck();
    var js = JSON.stringify(ids);
    console.log(js);
    fetch(rutaBack + 'gelak_json.php', {method: 'DELETE', body: js})
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

function editaGela(){
    $id=lortuCheck();
    numero=$id[0];
    window.location="Eguneratu.html?num="+numero+"";
}

function txertatuGela(){
    window.location="Txertatu.html";
}

function aldatuGela(){
    var idclase = document.getElementById("selector").value;
    if(idclase.match("Nada")){
        bistaratuFromPHP();
    }else{
        bistaratuFromPHP2(idclase);
    }
}

function bistaratuFromPHP2(gureNan) {
        console.log("Ha entrado")
        let options = {method: "GET"};
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
                alert("Errorea." + error);
            });

    }
