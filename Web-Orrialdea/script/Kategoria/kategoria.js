async function bistaratuFromPHP() {
    let options = {
        method: "GET",
        mode: 'cors'
    };
    const da = null;
    document.getElementById("tabla").innerHTML="";
    fetch(rutaBack + "kategoriak_json.php", options)
        .then(response => response.json())  // Analiza la respuesta JSON
        .then(data => {
            console.log(data);
            console.log(data.length);
            document.getElementById("selector").innerHTML = "";
            var opElement = document.createElement("option");
            opElement.value = "Nada";
            opElement.innerText="Aukeratu bat";
            document.getElementById("selector").appendChild(opElement);
            for (i = 0; i < data.length; i++) {
                var tableRow = "<tr></tr>";
                tableRow = tableRow.substring(0, tableRow.length - 5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" +
                    data[i].id + "'>" + "</td>" + tableRow.substring(tableRow.length - 5) + "<td>" + data[i].izena + "</td>";
                var trElement = document.createElement("tr");
                trElement.innerHTML = tableRow;
                document.getElementById("tabla").appendChild(trElement);
                var opElement = document.createElement("option");
                opElement.value = data[i].id;
                opElement.innerText = data[i].izena;
                document.getElementById("selector").appendChild(opElement);
            }
        })
        .catch(error => {
            alert("Taula ez dauka daturik db-an");
        });
}
window.addEventListener("load", bistaratuFromPHP);

function lortuCheck() {
    var checkboxes = document.querySelectorAll('input[name="c"]:checked');
    var ids = [];
    checkboxes.forEach(function (checkbox) {
        ids.push(checkbox.id);
    });
    return ids;
}

function aldatuKategoria(){
    var ide = document.getElementById("selector").value;
    if(ide.match("Nada")){
        bistaratuFromPHP();
    }else{
        bistaratuFromPHP2(ide);
    }
}

function bloquearEdit() {
    var ids = lortuCheck();
    if (ids.length > 1) {
        document.getElementById("botonedit").style.visibility = "hidden";
    } else {
        document.getElementById("botonedit").style.visibility = "visible";
    }
}

function checkZiur() {
    if (confirm("Ziur zaude hau ezabatu nahi duzula?")) {
        deleteKategoria();
    } else {}
}

function deleteKategoria() {
    let ids = lortuCheck();
    let js = JSON.stringify(ids);
    fetch(rutaBack + 'kategoriak_json.php', { method: 'DELETE', body: js, mode: 'cors' })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (data.match("Fatal error")) {
                alert("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu");
            }else{
                location.reload();
            }
        });
}

function editaKategoria() {
    let ids = lortuCheck();
    let numero = ids[0];
    window.location = "Eguneratu.html?num="+numero;
}

function txertatuKategoria() {
    window.location = "Txertatu.html";
}

function bistaratuFromPHP2(gureId) {
        console.log("Ha entrado")
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "kategoriak_json.php?num="+gureId+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("tabla").innerHTML="";
                for(i=0; i < data.length; i++){
                    var tableRow = "<tr></tr>";
                        tableRow = tableRow.substring(0, tableRow.length - 5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" +
                            data[i].id + "'>" + "</td>"+
                            tableRow.substring(tableRow.length - 5) + "<td>" + data[i].izena + "</td>"
                        var trElement = document.createElement("tr");
                        trElement.innerHTML = tableRow;
                        document.getElementById("tabla").appendChild(trElement);
                    }
            })
            .catch(error => {
                alert("Taula ez dauka daturik db-an");
            });

    }