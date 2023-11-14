<?php
    //si no se pone esto, no va a funcionar en el server
    //header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");    
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Kokalekua {
        public $idGela;
        public $etiketa;
        public $hasieraData;
        public $amaieraData;
        
        public function __construct($etiketa, $idGela, $hasieraData, $amaieraData) {
            $this->etiketa = $etiketa;
            $this->idGela = $idGela;
            $this->hasieraData = $hasieraData;
            $this->amaieraData = $amaieraData;
        }

        public function getEtiketa()
        {
            return $this->etiketa;
        }

        public function getIdGela()
        {
            return $this->idGela;
        }

        public function getHasieraData()
        {
            return $this->hasieraData;
        }

        public function getAmaieraData()
        {
            return $this->amaieraData;
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $json_data = json_decode(file_get_contents("php://input"), true);
        if (isset($_GET["num"])) {
            $emaitzak = lortuKokalekuakByEtiketa($_GET["num"]);
            echo json_encode($emaitzak);
        } else {
            $emaitzak = lortuKokalekuak();
            echo json_encode($emaitzak);
        }
        exit;
    } elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
        $json_data = json_decode(file_get_contents("php://input"), true);
        $emaitzak = txertatuKokalekua($json_data["etiketa"], $json_data["idGela"], $json_data["hasieraData"], $json_data["amaieraData"]);
        echo json_encode("okai");
    } elseif ($_SERVER["REQUEST_METHOD"] == "PUT") {
        $json_data = json_decode(file_get_contents("php://input"), true);
        if (isset($json_data["id"], $json_data["izena"])) {
            $id = $json_data["id"];
            $izena = $json_data["izena"];
            eguneratuKokalekua($id, $izena);
        }
    } elseif ($_SERVER["REQUEST_METHOD"] == "DELETE") {
        $json_data = json_decode(file_get_contents("php://input"), true);
        if (isset($json_data)) {
            $id = $json_data;
            foreach ($id as $value) {
                ezabatuKokalekua($value);
            }
            echo "OK";
        }
    }

    function ezabatuKokalekua($value) {
        global $db;
        $datuak=explode(",",$value);
        $sql = "DELETE FROM kokalekua WHERE etiketa = '$datuak[0]' AND idGela = '$datuak[1]' AND hasieraData = '$datuak[2]'";
        $db->ezabatu($sql);
    }

    function eguneratuKokalekua($etiketa, $idGela, $hasieraData, $amaieraData) {
        global $db;
        $sql = "UPDATE kokalekua SET idGela = '$idGela', hasieraData = '$hasieraData', amaieraData = '$amaieraData' WHERE etiketa = '$etiketa'";
        $db->eguneratu($sql);
    }

    function txertatuKokalekua($etiketa, $idGela, $hasieraData, $amaieraData) {
        global $db;
        $sql = "INSERT INTO kokalekua (etiketa, idGela, hasieraData, amaieraData) VALUES ('$etiketa', '$idGela', '$hasieraData', '$amaieraData')";
        $db->txertatu($sql);
    }

    function lortuKokalekuak() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT I.etiketa, G.izena, I.idEkipamendu, E.marka, E.modelo, K.idGela, K.hasieraData, K.amaieraData FROM kokalekua K, ekipamendua E, inbentarioa I, gela G WHERE K.etiketa = I.etiketa AND  I.idEkipamendu = E.id AND G.id = K.idGela;");
        $kokalekuak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $kokalekuak[] = array($row["etiketa"],  $row["idEkipamendu"], $row["marka"], $row["modelo"], $row["idGela"], $row["hasieraData"], $row["amaieraData"], $row["izena"]);
            }
            return $kokalekuak;
        }else{
        } 
    }

    function lortuKokalekuakByEtiketa($etiketa) {
        $datos = explode(",", $etiketa);
        global $db;
        $emaitzak = $db->datuakLortu("SELECT K.etiketa, K.idGela, K.hasieraData, K.amaieraData FROM kokalekua K, ekipamendua E, inbentarioa I WHERE K.etiketa = '$datos[0]' AND K.idGela = '$datos[1]' AND K.hasieraData = '$datos[2]' GROUP BY K.etiketa");
        $kokalekuak = array();
    
        if ($emaitzak->num_rows > 0) {
            while ($row = $emaitzak->fetch_assoc()) {
                $kokalekuak[] = array(
                    "etiketa" => $row["etiketa"],
                    "idGela" => $row["idGela"],
                    "hasieraData" => $row["hasieraData"],
                    "amaieraData" => $row["amaieraData"]
                );
            }
            return $kokalekuak;
        } else {
            return "mal";
        }
    }
?>