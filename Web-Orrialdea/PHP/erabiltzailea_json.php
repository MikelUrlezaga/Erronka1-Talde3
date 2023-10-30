<?php
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Erabiltzailea {
        public $nan;
        public $izena;
        public $abizena;
        public $erabiltzailea;
        public $pasahitza;
        public $rola;
        
        public function __construct($nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola) {
            $this->nan = $nan;
            $this->izena = $izena;
            $this->abizena = $abizena;
            $this->erabiltzailea = $erabiltzailea;
            $this->pasahitza = $pasahitza;
            $this->rola = $rola;
        }

        public function getNan()
        {
            return $this->nan;
        }

        public function getIzena()
        {
            return $this->izena;
        }

        public function getAbizena()
        {
            return $this->abizena;
        }

        public function getErabiltzailea()
        {
            return $this->erabiltzailea;
        }

        public function getPasahitza()
        {
            return $this->pasahitza;
        }

        public function getRola()
        {
            return $this->rola;
        }

    }

    if ($_SERVER["REQUEST_METHOD"]=="GET"){
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(isset($_GET["num"])){
            $emaitzak = lortuErabiltzaileaById($_GET["num"]);
            echo json_encode($emaitzak);
        }else{
            $emaitzak = lortuErabiltzailea();
            echo json_encode($emaitzak);
        }
        exit;
    }elseif($_SERVER["REQUEST_METHOD"] == "POST"){
        $json_data = json_decode(file_get_contents("php://input"), true);
        $emaitzak = txertatuErabiltzailea($json_data["nan"], $json_data["izena"], $json_data["abizena"], $json_data["erabiltzailea"], $json_data["pasahitza"], $json_data["rola"]);
        echo json_decode("okai");
    }elseif($_SERVER["REQUEST_METHOD"] == "PUSH"){
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(isset($json_data["nan"], $json_data["izena"], $json_data["abizena"], $json_data["erabiltzailea"], $json_data["pasahitza"], $json_data["rola"])){
            $nan = $json_data["nan"];
            $izena = $json_data["izena"];
            $abizena = $json_data["abizena"];
            $erabiltzailea = $json_data["erabiltzailea"];
            $pasahitza = $json_data["pasahitza"];
            $rola = $json_data["rola"];

            eguneratuErabiltzailea($nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola);
        }
    }elseif($_SERVER["REQUEST_METHOD"] == "DELETE"){
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(isset($json_data)){
            $nan = $json_data;
            foreach($nan as $value){
                ezabatuErabiltzailea($value);
            }
            echo "okey";
        }
    }

    function ezabatuErabiltzailea($nan) {
        global $db;
        $sql = "DELETE FROM erabiltzailea WHERE nan = '$nan'";
        $db->ezabatu($sql);
    }

    function eguneratuErabiltzailea($nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola) {
        global $db;
        $sql = "UPDATE erabiltzailea SET izena = '$izena', erabiltzailea = '$erabiltzailea', abizena = '$abizena', pasahitza = '$pasahitza', rola = '$rola' WHERE nan = '$nan'";
        $db->eguneratu($sql);
    }

    function txertatuErabiltzailea($nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola) {
        global $db;
        $sql = "INSERT INTO erabiltzailea (nan, izena, abizena, erabiltzailea, pasahitza, rola) VALUES ('$nan', '$izena', '$abizena', '$erabiltzailea', '$pasahitza', '$rola')";
        $db->txertatu($sql);
    }

    function lortuErabiltzailea() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM erabiltzailea");
        $erabiltzaileak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $erabiltzaileak[] = new Erabiltzailea($row["nan"], $row["izena"], $row["abizena"], $row["erabiltzailea"],  $row["pasahitza"], $row["rola"]);
            }
            return $erabiltzaileak;
        }
    }

    function lortuErabiltzaileaById($nan) {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM erabiltzailea WHERE nan = '$nan'");
        $erabiltzaileak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $erabiltzaileak[] = new Erabiltzailea($row["nan"], $row["izena"], $row["abizena"], $row["erabiltzailea"],  $row["pasahitza"], $row["rola"]);
            }
            return $erabiltzaileak;
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>php...</title>
</head>
<body>
    
</body>
</html>