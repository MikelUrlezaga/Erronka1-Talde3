    /**
     * @function teclado
     * @description Teklatu sarrera detektatu eta Enter tekla sakatzean `actuInbentarioa` funtzioa deitzen du.
     * @param {object} event - Teklatu sarrera detektatzean jasotako `event` objektua.
     */
    function teclado(event) {
        var codigo = event.which || event.keyCode;
        if (codigo==13) {
            actuInbentarioa()
        }
    }
    /**
     * @var {string} paramstr - Orriaren query string-a.
     * @var {Array} paramarr - Query string-a & karakterean banatuta.
     * @var {object} params - Parametroak gordeko diren objetua.
     * @var {string} unaId - Orrialde honetan jaso den parametroa.
     * @var {Array} nuestraId - unaId parametroa koma bidez banatuta.
     */
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
    /**
     * @function bistaratuFromPHP2
     * @async
     * @description Koka-leku bat eguneratzen den orduan erabiliko den funtzioa.
     * @param {string} idcls - Koka-lekuaren identifikadorea.
     */
    async function bistaratuFromPHP2(idcls) {
        let options = {method: "GET"};
        fetch(rutaBack + "kokalekuak_json.php?num="+idcls+"", options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                console.log(data.length);
                document.getElementById("hasieraDataEguneratu").value=data[0].hasieraData;
                document.getElementById("amaieraDataEguneratu").value=data[0].amaieraData;
                fetch(rutaBack + "inbentarioa_json.php", options)
                    .then(response => response.json())  // Analiza la respuesta JSON
                    .then(data2 => {
                        console.log(data2);
                        console.log(data2.length);
                        var opElement = document.createElement("option");
                        opElement.value = "Nada";
                        opElement.innerText="Aukeratu bat";
                        document.getElementById("selectEki").appendChild(opElement);

                        for(i=0; i < data2.length; i++){
                            var opElement = document.createElement("option");
                            opElement.value = data2[i].etiketa;
                            opElement.innerText=data2[i].etiketa+" - "+data2[i].marka+" "+data2[i].modelo;
                            if(data[0].etiketa==data2[i].etiketa){
                                opElement.selected="selected";
                            }
                            document.getElementById("selectEki").appendChild(opElement);
                            
                            
                        }
                    })
                    .catch(error => {
                        alert("Errorea." + error);
                    });


                    fetch(rutaBack + "gelak_json.php", options)
                        .then(response => response.json())  // Analiza la respuesta JSON
                        .then(data2 => {
                            console.log(data2);
                            console.log(data2.length);
                            var opElemento = document.createElement("option");
                            opElemento.value = "Nada";
                            opElemento.innerText="Aukeratu bat";
                            document.getElementById("selectGela").appendChild(opElemento);

                            for(i=0; i < data2.length; i++){
                                var opElemento = document.createElement("option");
                                opElemento.value = data2[i].id;
                                opElemento.innerText=data2[i].id+" - "+data2[i].izena;
                                if(data[0].idGela==data2[i].id){
                                    opElemento.selected="selected";
                                }
                                document.getElementById("selectGela").appendChild(opElemento);
                                
                            }
                        })
                        .catch(error => {
                            alert("Errorea." + error);
                        });

            })
            .catch(error => {
                console.log("Errorea." + error);
            });

          

    }
    /**
     * @function aldatuInbentarioa
     * @description Inbentarioa eguneratzeko funtzioa.
     */
    function aldatuInbentarioa(){
        var idclase = document.getElementById("selectKoka").value;
        bistaratuFromPHP2(idclase);
        console.log(idclase)
    }
    /**
     * @function bistaratuFromPHP
     * @async
     * @description Kokalekuak JSON datu-basea eskuratzeko eta bistaratzeko funtzioa.
     */
    async function bistaratuFromPHP() {
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "kokalekuak_json.php",options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                console.log(data);
                var opElement = document.createElement("option");
                        opElement.value = "Nada";
                        opElement.innerText="Aukeratu bat";
                        document.getElementById("selectKoka").appendChild(opElement);
                        eti=unaId.split(",")
                for (let i = 0; i < data.length; i++) {
                            var opElement = document.createElement("option");
                            opElement.value = data[i][0]+","+data[i][4]+","+data[i][5];
                            opElement.innerText=data[i][0]+" - "+data[i][4]+" - "+data[i][5];
                            if(eti[0]==data[i][0]){
                                opElement.selected="selected";
                            }
                            document.getElementById("selectKoka").appendChild(opElement);
                }
            })
            .catch(error => {
                console.log("Errorea." + error);
            });
    }

    /**
     * @event window#load
     * @description Orria kargatzerakoan `bistaratuFromPHP` funtzioa deitzen du.
     */
    window.addEventListener("load", bistaratuFromPHP);
    /**
     * @event window#load
     * @description Orria kargatzerakoan `bistaratuFromPHP2` funtzioa deitzen du `unaId` parametroarekin.
     */
    window.addEventListener("load", bistaratuFromPHP2(unaId));
    /**
     * @function actuKokalekuak
     * @description Kokalekua eguneratzeko funtzioa.
     */
    function actuKokalekuak() {
        var  datosAntiguos= document.getElementById("selectKoka").value;
        var etiketa = document.getElementById("selectEki").value;
        var idGela = document.getElementById("selectGela").value;
        var hasieraData = document.getElementById("hasieraDataEguneratu").value;
        var amaieraData = document.getElementById("amaieraDataEguneratu").value;
        if(etiketa == "" || idGela == "" || hasieraData=="" || amaieraData==""){
            alert("Daturen bat falta zaizu.");
        }else{
            var clasea = {datosAntiguos, etiketa, idGela, hasieraData, amaieraData};
            var js = JSON.stringify(clasea);
            console.log(js + "hau da js");
            fetch(rutaBack + 'kokalekuak_json.php', {method: 'PUT', body: js})
                .then(function (response) {
                        return response.text();
                })
                .then(data=>{
                        console.log(data);
                        if(data.match("Hasierako")){
                            alert("Hasierako data amaierakoa baino handiagoa da.");
                        }else if (data.match("ez dago libre")){
                            alert("Ekipamendu hau ez dago libre data honetarako.");
                        }else{
                            alert(etiketa+"-ren erreserba txertatuta");
                        }
                    })
                .catch(error => {
                    console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                });
            }
    }