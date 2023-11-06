<?php
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Inbentarioa {
        public $idEkipamendu;
        public $etiketa;
        public $erosketaData;
        public $marka;
        public $modelo;
        
        public function __construct($etiketa, $idEkipamendu, $erosketaData, $marka, $modelo) {
            $this->etiketa = $etiketa;
            $this->idEkipamendu = $idEkipamendu;
            $this->erosketaData = $erosketaData;
            $this->marka = $marka;
            $this->modelo = $modelo;
        }
    }

    if ($_SERVER["REQUEST_METHOD"]=="GET"){
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(isset($_GET["num"])){
            $emaitzak = lortuInbentarioaById($_GET["num"]);
            echo json_encode($emaitzak);
        }else{
            $emaitzak = lortuInbentarioa();
            echo json_encode($emaitzak);
        }
        exit;
    }elseif($_SERVER["REQUEST_METHOD"] == "POST"){
        $json_data = json_decode(file_get_contents("php://input"), true);
        $emaitzak = txertatuInbentarioa($json_data["etiketa"], $json_data["idEkipamendu"], $json_data["erosketaData"]);
        echo json_decode("okai");
    }elseif($_SERVER["REQUEST_METHOD"] == "PUT"){
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(isset($json_data["idEkipamendu"], $json_data["etiketa"], $json_data["erosketaData"])){
            $idEkipamendu = $json_data["idEkipamendu"];
            $etiketa = $json_data["etiketa"];
            $erosketaData = $json_data["erosketaData"];

            eguneratuInbentarioa($etiketa, $idEkipamendu, $erosketaData);
        }
    }if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
        $json_data = json_decode(file_get_contents("php://input"), true);
    
        if (isset($json_data)) {
            // foreach ($json_data as $item) {
            //     $etiketa = $item['etiketa'];
            //     $idEkipamendu = $item['idEkipamendu'];
            //     ezabatuInbentarioa($etiketa, $idEkipamendu);
            // }
            for ($i=0; $i < count($json_data); $i++) { 
                $datuak = explode(',', $json_data[$i]);
                $etiketa=$datuak[0];
                $id=$datuak[1];
                ezabatuInbentarioa($etiketa, $id);
            }
        }
    }
    
    function ezabatuInbentarioa($etiketa, $idEkipamendu) {
        global $db;
        $sql = "DELETE FROM inbentarioa WHERE etiketa = '$etiketa'";
        $db->ezabatu($sql);

        $sql2 = "UPDATE ekipamendua SET stock = (SELECT stock FROM ekipamendua WHERE id = '$idEkipamendu') - 1 WHERE id = '$idEkipamendu'";
        $db->eguneratu($sql2);
    }

    function eguneratuInbentarioa($etiketa, $idEkipamendu, $erosketaData) {
        global $db;
        $sql = "UPDATE inbentarioa SET etiketa = '$etiketa', erosketaData = '$erosketaData' WHERE idEkipamendu = '$idEkipamendu'";
        $db->eguneratu($sql);
    }

    function txertatuInbentarioa($etiketa, $idEkipamendu, $erosketaData) {
        global $db;
        $sqlMax = "SELECT stock FROM ekipamendua WHERE id = '$idEkipamendu'";
        $sqlCount = "SELECT count(etiketa) FROM inbentarioa WHERE idEkipamendu = '$idEkipamendu'";
        $sqlMaximo = $db->datuakLortu($sqlMax);
        $sqlCuenta = $db->datuakLortu($sqlCount);
        $arr1 = array();
        $arr2 = array();
        if (is_object($sqlMaximo)){
            while ($row = $sqlMaximo->fetch_assoc()) {
                $arr1[] = $row;
            }
            echo $arr1[0]["stock"];
        }

        if (is_object($sqlCuenta)){
            while ($row =  $sqlCuenta->fetch_assoc()) {
                $arr2[] = $row;
            }
            echo $arr2[0]["count(etiketa)"];
        }
        //echo $arr1[0]. " ".$arr2[0];
        if($arr1[0]["stock"] >  $arr2[0]["count(etiketa)"]){
            $sql = "INSERT INTO inbentarioa (etiketa, idEkipamendu, erosketaData) VALUES ('$etiketa', '$idEkipamendu', '$erosketaData')";
            $db->txertatu($sql);
        }else{
            echo "No hay stock suficiente.";
        }
    }

    function lortuInbentarioa() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT I.*, E.marka, E.modelo FROM inbentarioa I INNER JOIN ekipamendua E ON I.idEkipamendu = E.id");
        $inbentarioa = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $inbentarioa[] = new Inbentarioa($row["etiketa"], $row["idEkipamendu"], $row["erosketaData"], $row["marka"], $row["modelo"]);
            }
            return $inbentarioa;
        }else{
            //echo "".$emaitzak;
        }
    }

    function lortuInbentarioaById() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT I.*, E.marka, E.modelo FROM inbentarioa I INNER JOIN ekipamendua E ON I.idEkipamendu = E.id");
        $inbentarioa = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $inbentarioa[] = new Inbentarioa($row["etiketa"], $row["idEkipamendu"], $row["erosketaData"], $row["marka"], $row["modelo"]);
            }
            return $inbentarioa;
        }else{
            //echo "".$emaitzak;
        }
    }

?>
<html>
    <head>
    </head>
    <body>
    </body>
</html>