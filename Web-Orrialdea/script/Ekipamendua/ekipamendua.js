async function bistaratuFromPHP() {
    let options = {method: "GET", mode: 'cors'};
    const da = null;
    fetch(rutaBack + "ekipamendua_json.php", options)
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
                data[i].id +"'>" +"</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].izena + "</td>" +
                tableRow.substring(tableRow.length-5) + "<td>" + data[i].deskribapena + "</td>" 
                + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].marka + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].modelo + "</td>"
                + tableRow.substring(tableRow.length-5) + "<td>" + data[i].stock + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].idKategoria + "</td>";

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
            alert("Taula ez dauka daturik db-an");
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
        deleteEkipamendua();
    }else{}
    
}

function deleteEkipamendua() {
    var ids = lortuCheck();
    var js = JSON.stringify(ids);
    console.log(js);
    fetch(rutaBack + 'ekipamendua_json.php', {method: 'DELETE', body: js})
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

function editaEkipamendua(){
    $id=lortuCheck();
    numero=$id[0];
    window.location="Eguneratu.html?num="+numero+"";
}

function txertatuEkipamendua(){
    window.location="Txertatu.html";
}

function aldatuEkipamendua(){
    var ide = document.getElementById("selector").value;
    if(ide.match("Nada")){
        bistaratuFromPHP();
    }else{
        bistaratuFromPHP2(ide);
    }
}

function bistaratuFromPHP2(gureId) {
        console.log("Ha entrado")
        console.log(gureId)
        let options = {method: "GET"};
        fetch(rutaBack + "ekipamendua_json.php?num="+gureId+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("tabla").innerHTML="";  
                var opElement = document.createElement("option");
                opElement.value = "Nada";
                opElement.innerText="Elige una opcion";
                for(i=0; i < data.length; i++){
                    var tableRow="<tr></tr>";
                tableRow = tableRow.substring(0,tableRow.length-5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" + 
                data[i].id +"'>" +"</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].izena + "</td>" +
                tableRow.substring(tableRow.length-5) + "<td>" + data[i].deskribapena + "</td>" 
                + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].marka + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].modelo + "</td>"
                + tableRow.substring(tableRow.length-5) + "<td>" + data[i].stock + "</td>" + tableRow.substring(tableRow.length-5) + "<td>" + data[i].idKategoria + "</td>";

                var trElement = document.createElement("tr");
                trElement.innerHTML = tableRow;
                document.getElementById("tabla").appendChild(trElement);
                }
            })
            .catch(error => {
                alert("Taula ez dauka daturik db-an");
            });

    }