console.log(obtenerCookie())
if (obtenerCookie().match("B")) {
    window.location = "http://www.talde3.edu/HTML/Orokorra/Login.html"
}else if(obtenerCookie().match("NoLoged")){
    window.location = "http://www.talde3.edu/HTML/Orokorra/Login.html";
}

/**
 * Erabiltzaileen datuak PHP zerbitzaritik eskuratzen ditu eta erakusten ditu.
 * @async
 * @function
 */
async function bistaratuFromPHP() {
    let options = {
        method: "GET",
        mode: 'cors'
    };
    const da = null;
    document.getElementById("tabla").innerHTML="";
    fetch(rutaBack + "erabiltzailea_json.php", options)
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
                    data[i].nan + "'>" + "</td>" + tableRow.substring(tableRow.length - 5) + "<td>" + data[i].nan + "</td>" +
                    tableRow.substring(tableRow.length - 5) + "<td>" + data[i].izena + "</td>" +
                    tableRow.substring(tableRow.length - 5) + "<td>" + data[i].abizena + "</td>" +
                    tableRow.substring(tableRow.length - 5) + "<td>" + data[i].erabiltzailea + "</td>" +
                    tableRow.substring(tableRow.length - 5) + "<td>" + data[i].rola + "</td>";
                var trElement = document.createElement("tr");
                trElement.innerHTML = tableRow;
                document.getElementById("tabla").appendChild(trElement);
                var opElement = document.createElement("option");
                opElement.value = data[i].nan;
                opElement.innerText = data[i].izena;
                document.getElementById("selector").appendChild(opElement);
            }
        })
        .catch(error => {
            alert("Taula ez dauka daturik db-an");
        });
}
// Orrialdea kargatzen denean Erabiltzaileen datuak kargatu.
window.addEventListener("load", bistaratuFromPHP);

/**
 * Hautatutako erabiltzaileen nanak lortzen ditu.
 * @function
 * @returns {string[]} - Hautatutako erabiltzaileen nanak.
 */
function lortuCheck() {
    var checkboxes = document.querySelectorAll('input[name="c"]:checked');
    var nans = [];
    checkboxes.forEach(function (checkbox) {
        nans.push(checkbox.id);
    });
    return nans;
}
/**
 * Erabiltzaileen editatzeko botoia blokeatzen du.
 * @function
 */
function bloquearEdit() {
    var nans = lortuCheck();
    if (nans.length > 1) {
        document.getElementById("botonedit").style.visibility = "hidden";
    } else {
        document.getElementById("botonedit").style.visibility = "visible";
    }
}
/**
 * Ziurtatzeko mezu bat bistaratzen du eta erabiltzailea ezabatzen da.
 * @function
 */
function checkZiur() {
    if (confirm("Ziur zaude hau ezabatu nahi duzula?")) {
        deleteErabiltzailea();
    } else {}
}
/**
 * Hautatutako erabiltzaileak ezabatzen ditu.
 * @function
 */
function deleteErabiltzailea() {
    let nans = lortuCheck();
    let js = JSON.stringify(nans);
    fetch(rutaBack + 'erabiltzailea_json.php', { method: 'DELETE', body: js })
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
/**
 * Hautatutako erabiltzailea editatzen duen ekintza.
 * @function
 */
function editaErabiltzailea() {
    let nans = lortuCheck();
    let nan = nans[0];
    window.location = "Eguneratu.html?nan=" + nan;
}
/**
 * Erabiltzailea txertatu orri berri batera berbideratzen du.
 * @function
 */
function txertatuErabiltzailea() {
    window.location = "Txertatu.html";
}
/**
 * Hautatutako erabiltzailea editatzeko orrira berbideratzen du.
 * @function
 */
function aldatuErabiltzaile(){
    var ide = document.getElementById("selector").value;
    if(ide.match("Nada")){
        bistaratuFromPHP();
    }else{
        bistaratuFromPHP2(ide);
    }
}
/**
 * Erabiltzailearen datuak eskuratzen ditu eta taulan erakusten ditu.
 * @async
 * @function
 */
function bistaratuFromPHP2(gureNan) {
        console.log("Ha entrado")
        let options = {method: "GET"};
        fetch(rutaBack + "erabiltzailea_json.php?num="+gureNan+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("tabla").innerHTML="";
                for(i=0; i < data.length; i++){
                    var tableRow = "<tr></tr>";
                        tableRow = tableRow.substring(0, tableRow.length - 5) + "<td id='check' class='large'><input type='checkbox' onchange='bloquearEdit()' name='c' id='" +
                            data[i].nan + "'>" + "</td>" + tableRow.substring(tableRow.length - 5) + "<td>" + data[i].nan + "</td>" +
                            tableRow.substring(tableRow.length - 5) + "<td>" + data[i].izena + "</td>" +
                            tableRow.substring(tableRow.length - 5) + "<td>" + data[i].abizena + "</td>" +
                            tableRow.substring(tableRow.length - 5) + "<td>" + data[i].erabiltzailea + "</td>" +
                            tableRow.substring(tableRow.length - 5) + "<td>" + data[i].rola + "</td>";
                        var trElement = document.createElement("tr");
                        trElement.innerHTML = tableRow;
                        document.getElementById("tabla").appendChild(trElement);

                    }
            })
            .catch(error => {
                alert("Taula ez dauka daturik db-an");
            });

    }