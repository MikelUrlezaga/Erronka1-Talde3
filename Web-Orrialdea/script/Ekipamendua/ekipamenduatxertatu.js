
function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        createEkipamendua()
    }
}
    function cargarKatego(){
        let options = {
            method: "GET",
            mode: 'cors'
        };
        fetch(rutaBack + "kategoriak_json.php", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                for (i = 0; i < data.length; i++) {
                    var opElement = document.createElement("option");
                    opElement.value = data[i].id;
                    opElement.innerText = data[i].izena;
                    document.getElementById("selecTxertatu").appendChild(opElement);
                }
            })
            .catch(error => {
                alert("Errorea." + error);
            });
    }
    window.addEventListener("load", cargarKatego);
    function createEkipamendua() {
        var izena = document.getElementById("izenaEkipamenduaTxertatu").value;
        var marka = document.getElementById("markaEkipamenduaTxertatu").value;
        var deskribapena = document.getElementById("deskribapenaEkipamenduaTxertatu").value;
        var modelo = document.getElementById("modeloEkipamenduaTxertatu").value;
        var idKategoria = document.getElementById("selecTxertatu").value;
        var stock = document.getElementById("stockEkipamenduaTxertatu").value;
        var clasea = {izena, deskribapena, marka, modelo, stock, idKategoria};
        var js = JSON.stringify(clasea);
        console.log(js);
        if (izena == "" || (/^[0-9]+$/.test(izena)) || !(/^[0-9]+$/.test(stock)) || deskribapena == "" || marka == "" || modelo == "" || stock == "" || idKategoria == "Aukeratu bat") {
            if ((/^[0-9]+$/.test(izena)) || !(/^[0-9]+$/.test(stock))) {
                alert("Izena ezin da zenbaki bat izan eta stock-a zenbaki bat izan behar da")
            } else {
                alert("Datuak ondo zartuta daudela zihurtatu");
            }
        }else{
            fetch(rutaBack + 'ekipamendua_json.php', {method: 'POST', body: js})
                .then(function (response) {
                        return response.text();
                })
                .then(data=>{
                    if(data.match("jada")){
                        alert("Ekipamendu hori jada existitzen da. Probatu beste izenarekin.");
                    }
                })
                .catch(error => {
                    console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                });
        }
    }