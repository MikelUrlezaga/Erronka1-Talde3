function teclado(event) {
    var codigo = event.which || event.keyCode;
    if (codigo==13) {
        createKategoria()
    }
}

function createKategoria() {
    var izena = document.getElementById("IzenaKategoriaTxertatu").value;
    var kategoria = { izena };
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
                if (izena == "") {
                    alert("Datuak ondo zartuta daudela zihurtatu");
                    }else{
                    fetch(rutaBack + 'kategoriak_json.php', { method: 'POST', body: js })
                        .then(function (response) {
                            return response.text();
                        })
                        .then(data=>{
                            console.log(data);
                            alert(izena+" txertatuta");
                            
                        })
                        // .catch(error => {
                        //     console.log("Errorea: " + error);
                        // });
                }
            }else{
                alert("Kategoria hori jada existitzen da. Probatu beste izenarekin.")
            }
        })
        .catch(error => {
            console.log(error)
        });
    
}