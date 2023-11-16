    
    function teclado(event) {
        var codigo = event.which || event.keyCode;
        if (codigo==13) {
            actuEkipamendua()
        }
    }

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

    async function bistaratuFromPHP2(idcls) {
        console.log("Ha entrado")
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "ekipamendua_json.php?num="+idcls+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("izenaEkiEgu").value=data[0].izena;
                document.getElementById("deskribapenaEkiEgu").value=data[0].deskribapena;
                document.getElementById("markaEkiEgu").value=data[0].marka;
                document.getElementById("modeloEkiEgu").value=data[0].modelo;
                document.getElementById("stockEkiEgu").value=data[0].stock;
                document.getElementById("kategoriaEkiEgu").value=data[0].idKategoria;
                document.getElementById("selectore").value=idcls;
                document.getElementById("titulo").innerText= data[0].izena + " Ekipamendua eguneratu";
            })
            .catch(error => {
            });
    }

    function aldatuEkipamendua(){
        var idclase = document.getElementById("selectore").value;
        console.log(document.getElementById("selectore").value);

        bistaratuFromPHP2(idclase);
        nuestraId= idclase;
    }

    async function bistaratuFromPHP() {
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "ekipamendua_json.php",options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
     
                for (let i = 0; i < data.length; i++) {
                    console.log(nuestraId + "holi");
                    console.log(data[i].id);
                    if(data[i].id==nuestraId){
                        console.log("Entra "+nuestraId);
                    }
                    var opcion="<option value='"+data[i].id+"'>"+data[i].izena+
                    "</option>";
                    //+data[i].marka+data[i].modelo+data[i].stock+data[i].idKategoria
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

    function actuEkipamendua() {
        var id = document.getElementById("selectore").value;
        var izena = document.getElementById("izenaEkiEgu").value;
        var deskribapena = document.getElementById("deskribapenaEkiEgu").value;
        var marka = document.getElementById("markaEkiEgu").value;
        var modelo = document.getElementById("modeloEkiEgu").value;
        var stock = document.getElementById("stockEkiEgu").value;
        var idKategoria = document.getElementById("kategoriaEkiEgu").value;
        var clasea = {id, izena, deskribapena, modelo, marka, stock, idKategoria};
        var js = JSON.stringify(clasea);
        console.log(js + "hau da js");
        if (id == "Aukeratu bat" || (/^[0-9]+$/.test(izena)) || !(/^[0-9]+$/.test(stock)) || izena == "" || deskribapena == "" || marka == "" || modelo == "" || stock == "" || idKategoria == "") {
            if ((/^[0-9]+$/.test(izena)) || !(/^[0-9]+$/.test(stock))) {
                alert("Izena ezin da zenbaki bat izan eta stock-a zenbaki bat izan behar da")
            } else {
                alert("Datuak ondo zartuta daudela zihurtatu");
            }
            
        }else{
            fetch(rutaBack + 'ekipamendua_json.php', {method: 'PUT', body: js})
                .then(function (response) {
                        return response.text();
                })
                .then(data=>{
                    console.log(data);
                    
                })
                .catch(error => {
                    console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                });
        }
    }