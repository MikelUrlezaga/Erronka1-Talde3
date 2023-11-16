    
    function teclado(event) {
        var codigo = event.which || event.keyCode;
        if (codigo==13) {
            actuInbentarioa()
        }
    }

    var paramstr = window.location.search.substr(1);
    console.log(window.location.search.substr(1));
    var paramarr = paramstr.split ("&");
    var params = {};
    var unaId=0;
    var nuestraId=0;
    
    for ( var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
        console.log(tmparr[1]);
        unaId=tmparr[1];
        
    }   
    nuestraId=unaId.split(",");
    async function bistaratuFromPHP2(idcls) {
        let options = {method: "GET"};
        fetch("../../PHP/inbentarioa_json.php?eti="+idcls+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("EtiketaInbEguneratu").value=data[0].etiketa;
                document.getElementById("ErosketaDataInbEguneratu").value=data[0].erosketaData;
                document.getElementById("etiketaAntigua").style.visibility="visible";
                document.getElementById("etiketaAntigua").value=data[0].etiketa;
                document.getElementById("etiketaAntigua").style.visibility="hidden";
                document.getElementById("idInvisible").style.visibility = "visible";
                document.getElementById("idInvisible").value = data[0].idEkipamendu;
                document.getElementById("idInvisible").style.visibility = "hidden";
                document.getElementById("selectore").value=data[0].etiketa;

            })
            .catch(error => {
                console.log("Errorea." + error);
            });
    }

    function aldatuInbentarioa(){
        var idclase = document.getElementById("selectore").value;
        console.log(document.getElementById("selectore").value);

        bistaratuFromPHP2(idclase);
        nuestraId[0]= idclase;
    }

    async function bistaratuFromPHP() {
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "inbentarioa_json.php",options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                var opElement = document.createElement("option");
                opElement.value = "Nada";
                opElement.innerText="Aukeratu bat";
                document.getElementById("selectore").appendChild(opElement);
                for (let i = 0; i < data.length; i++) {
                    console.log(data + "holi");
                    if(data[i].etiketa==nuestraId[0]){
                        console.log("Entra "+nuestraId[0]);
                    }
                    var opcion="<option value='"+data[i].etiketa+"'>"+data[i].etiketa+"-"+data[i].marka+ " " +data[i].modelo+
                    "</option>";
                    //+data[i].marka+data[i].modelo+data[i].stock+data[i].idKategoria
                    var opElement = document.createElement("option");
                    opElement.innerHTML = opcion;
                    opElement.value = data[i].etiketa;
                    if(data[i].etiketa==nuestraId[0]){
                        opElement.selected="selected";
                    }
                    document.getElementById("selectore").appendChild(opElement);
                }
            })
            .catch(error => {
                alert("Errorea." + error);
            });
    }

    
    window.addEventListener("load", bistaratuFromPHP);
    window.addEventListener("load", bistaratuFromPHP2(nuestraId[0]));

    function actuInbentarioa() {
        document.getElementById("idInvisible").style.visibility="visible";
        var idEkipamendu = document.getElementById("idInvisible").value;
        document.getElementById("idInvisible").style.visibility="hidden";
        var etiketa = document.getElementById("EtiketaInbEguneratu").value;
        var erosketaData = document.getElementById("ErosketaDataInbEguneratu").value;
        document.getElementById("etiketaAntigua").style.visibility="visible";
        var aurrekoEtiketa = document.getElementById("etiketaAntigua").value;
        document.getElementById("etiketaAntigua").style.visibility="hidden";
        var clasea = {idEkipamendu, etiketa, erosketaData, aurrekoEtiketa};
        var js = JSON.stringify(clasea);
        console.log(js + "hau da js");
        if (idEkipamendu == "Nada" || etiketa == "" || new Date(erosketaData) >  new Date()) {
            alert("Datuak ondo zartuta daudela zihurtatu");
        }else{
            fetch(rutaBack + 'inbentarioa_json.php', {method: 'PUT', body: js, mode: 'cors'})
                .then(function (response) {
                        return response.text();
                })
                .then(data=>{
                    console.log(data);
                    alert(etiketa+" eguneratuta");
                    
                })
                .catch(error => {
                    console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                });
        }
    }