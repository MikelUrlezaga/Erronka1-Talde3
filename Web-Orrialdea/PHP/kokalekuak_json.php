<?php
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
            $emaitzak = lortuKokalekuaByEtiketa($_GET["num"]);
            echo json_encode($emaitzak);
        } else {
            $emaitzak = lortuKokalekuak();
            echo json_encode($emaitzak);
        }
        exit;
    } elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
        $json_data = json_decode(file_get_contents("php://input"), true);
        $emaitzak = txertatuKokalekua($json_data["izena"]);
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

    function ezabatuKokalekua($etiketa, $idGela, $hasieraData) {
        global $db;
        $sql = "DELETE FROM kokalekua WHERE etiketa = '$etiketa' AND hasieraData = '$hasieraData' AND idGela = '$idGela'";
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
        $emaitzak = $db->datuakLortu("SELECT I.etiketa, I.idEkipamendu, E.marka, E.modelo, K.idGela, K.hasieraData, K.amaieraData FROM kokalekua K, ekipamendua E, inbentarioa I, gela G WHERE K.etiketa = I.etiketa AND  I.idEkipamendu = E.id AND G.id = K.idGela;");
        $kokalekuak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $kokalekuak[] = array($row["etiketa"],  $row["idEkipamendu"], $row["marka"], $row["modelo"], $row["idGela"], $row["hasieraData"], $row["amaieraData"]);
            }
            return $kokalekuak;
        }else{
        } 
    }


    function lortuKokalekuakByEtiketa($etiketa) {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM kokalekua K, ekipamendua E, inbentarioa I WHERE K.etiketa = '$etiketa', K.etiketa = I.etiketa AND I.idEkipamendu = E.id");
        $inbentarioa = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $kokalekuak[] = array($row["etiketa"], $row["marka"], $row["modelo"], $row["idGela"], $row["hasieraData"], $row["amaieraData"]);
            }
            return $inbentarioa;
        }else{
            //echo "".$emaitzak;
        }
    }
?>