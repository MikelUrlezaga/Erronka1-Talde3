/**
 * Tekladoko 'Enter' tekla (kodea 13) sakatzean "createGela" funtzioa deituko da.
 * @param {KeyboardEvent} event - Tekla sakatzean jasotako eventua.
 */
function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        createGela()
    }
}
    /**
     * Gela bat sortu beharrean deitzen den funtzioa.
     * "IzenaGelaTxertatu" eta "TaldeaGelaTxertatu" input-en balioak erabiliz.
     * Balio horiek erabiliz, datu basean gelaren existentzia egiaztatu eta 
     * onartuta badira, gelaren informazioa datu basean gehituko da.
     */
    function createGela() {
        var izena = document.getElementById("IzenaGelaTxertatu").value;
        var taldea = document.getElementById("TaldeaGelaTxertatu").value;
        let count=0;
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "gelak_json.php",options)
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
                    var clasea = {izena, taldea};
                    var js = JSON.stringify(clasea);
                    console.log(js);
                    if (izena == "" || taldea == "" || (izena.length)>4) {
                        alert("Datuak ondo zartuta daudela zihurtatu");
                    }else{
                        fetch(rutaBack + 'gelak_json.php', {method: 'POST', body: js})
                            .then(function (response) {
                                    return response.text();
                            })
                            .then(data=>{
                                console.log(data);
                                if(data.includes("Data too long")){
                                    alert("Gelaren izena oso luzea da. Gehienez 4 karaktere izan ditzake.")
                                }else {
                                    alert(izena+" txertatuta");
                                }
                            })
                            // .catch(error => {
                            //     //console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                            // });
                    }
                }else{
                    alert("Gela hori jada existitzen da. Probatu beste izenarekin.")
                }
                    })
                    .catch(error => {
                        console.log(error)
                    });
        
       
}
/**
 * Gela existitzen den edo ez egiaztatzeko funtzioa.
 * @param {string} gelaizena - Egiaztatu nahi den gelaren izena.
 * @returns {number} - Gela existitzen bada, 1 itzuliko du. Bestela, 0.
 */
 function exist(gelaizena) {
    var existe = 0;
        let options = {method: "GET", mode: 'cors'};
        fetch(rutaBack + "gelak_json.php",options)
            .then(response => response.json())  // Analiza la respuesta JSON
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                   
                    
                }
            })
            .catch(error => {
            });
            return existe;
    }