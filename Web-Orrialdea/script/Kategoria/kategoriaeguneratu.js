/**
 * Teklatuaren tecla Enter sakatzean ekintza bat burutzeko funtzioa.
 */
function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        actuKategoria()
    }
}

    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split("&");
    var params = {};
    var nuestraId = 0;

    for (var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
        nuestraId = tmparr[1];
    }
    /**
     * Aukeratutako kategoria baten datuak bistaratzeko funtzioa.
     * @param {number} idcls - Kategoriaren identifikazioa.
     */
    async function bistaratuFromPHP2(idcls) {
        let options = { method: "GET" };
        fetch(rutaBack + "kategoriak_json.php?num=" + idcls + "", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                document.getElementById("izenaKategoriaEguneratu").value = data[0].izena;
                document.getElementById("selectore").value = idcls;
                document.getElementById("titulo").innerText = data[0].izena + " Kategoria eguneratu";
            })
            // .catch(error => {
            //     alert("Errorea." + error);
            // });
    }
    /**
     * Kategoria bat aldatzen den ordu, aldaketa bat burutzeko funtzioa.
     */
    function cambiarClase() {
        var idclase = document.getElementById("selectore").value;
        bistaratuFromPHP2(idclase);
        nuestraId = idclase;
    }
    /**
     * Kategoriak bistaratzeko funtzioa.
     */
    async function bistaratuFromPHP() {
        let options = { method: "GET", mode: 'cors' };
        fetch(rutaBack + "kategoriak_json.php", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                var opElement = document.createElement("option");
                opElement.value = "Nada";
                opElement.innerText="Aukeratu bat";
                document.getElementById("selectore").appendChild(opElement);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == nuestraId) {
                        console.log("Entra " + nuestraId);
                    }
                    var opcion = "<option value='" + data[i].id + "'>" + data[i].izena + "</option>";
                    var opElement = document.createElement("option");
                    opElement.innerHTML = opcion;
                    opElement.value = data[i].id;
                    if (data[i].id == nuestraId) {
                        opElement.selected = "selected";
                    }
                    document.getElementById("selectore").appendChild(opElement);
                }
            })
            // .catch(error => {
            //     alert("Errorea." + error);
            // });
    }
    // Orrialdea kargatzen denean "bistaratuFromPHP" eta "bistaratuFromPHP2" funtzioak exekutatzen dira.
    window.addEventListener("load", bistaratuFromPHP);
    window.addEventListener("load", () => bistaratuFromPHP2(nuestraId));
    /**
     * Kategoria eguneratzen duen funtzioa.
     */
    function actuKategoria() {
        var id = document.getElementById("selectore").value;
        var gelaeditable = document.getElementById("selectore").innerHTML;
        var izena = document.getElementById("izenaKategoriaEguneratu").value;
        var kategoria = { id, izena };
        var js = JSON.stringify(kategoria);
        console.log(js);
        let count=0;
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "kategoriak_json.php",options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data.length);
                for (let i = 0; i < data.length; i++) {
                    if(data[i].izena == izena){
                        count++;
                    }
                }
                console.log(count);
                if(count==0){
                    if (id == "Aukeratu bat" || izena == "") {
                        alert("Datuak ondo zartuta daudela zihurtatu");
                    }else{
                        fetch(rutaBack + 'kategoriak_json.php', { method: 'PUT', body: js, mode: 'cors'})
                            .then(function (response) {
                                return response.text();
                            })
                            .then(data => {
                                console.log(data);
                                alert(izena+" eguneratuta");
                            });
                    }
                }else{
                    alert("Beste gela bat dago izen horrekin")
                }
                    })
                    .catch(error => {
                        console.log(error)
                    });
    }