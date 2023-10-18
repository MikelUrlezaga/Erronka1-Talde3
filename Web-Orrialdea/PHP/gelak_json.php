<?php
    include "db_konexioa.php";

    $db = new Datubasea();

    class Gela
    {
        public $id;
        public $izena;
        public $taldea;

        public function __construct($id, $izena, $taldea)
        {
            $this->id = $id;
            $this->izena = $izena;
            $this->taldea = $taldea;
        }

        public function getId()
        {
            return $this->id;
        }

        public function getIzena()
        {
            return $this->izena;
        }

        public function getTaldea()
        {
            return $this->taldea;
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        //if (isset($_GET["get_json_data"])) {
            // Devolver datos JSON al front-end
            $emaitzak = lortuGelak();
            echo json_encode($emaitzak);
            exit;
        //}
    } elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Manejar solicitudes POST
        $json_data = json_decode(file_get_contents("php://input"), true);
                // Realizar inserción de datos en la base de datos
        if (isset($json_data["izena"], $json_data["taldea"])) {
            $izena = $json_data["izena"];
            $taldea = $json_data["taldea"];
            txertatuGela($izena, $taldea);
        }
    } elseif ($_SERVER["REQUEST_METHOD"] == "PUSH") {
        $json_data = json_decode(file_get_contents("php://input"), true);
        // Realizar actualización de datos en la base de datos
        if (isset($json_data["id"], $json_data["izena"], $json_data["taldea"])) {
            $id = $json_data["id"];
            $izena = $json_data["izena"];
            $taldea = $json_data["taldea"];
            eguneratuGela($id, $izena, $taldea);
        }
    } elseif ($_SERVER["REQUEST_METHOD"] == "DELETE") {
        $json_data = json_decode(file_get_contents("php://input"), true);
        // Realizar eliminación de datos en la base de datos
        if (isset($json_data["id"])) {
            $id = $json_data["id"];
            ezabatuGela($id);
        }
    }

    function ezabatuGela($id)
    {
        global $db;
        $sql = "DELETE FROM gela WHERE id = '$id'";
        $db->ezabatu($sql);
    }

    function eguneratuGela($id, $izena, $taldea)
    {
        global $db;
        $sql = "UPDATE gela SET izena = '$izena', taldea = '$taldea' WHERE id = '$id'";
        $db->eguneratu($sql);
    }

    function txertatuGela($izena, $taldea)
    {
        global $db;
        $sql = "INSERT INTO gela (izena, taldea) VALUES ('$izena', '$taldea')";
        $db->txertatu($sql);
    }

    function lortuGelak()
    {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM gela");
        $gelak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $gelak[] = new Gela($row["id"], $row["izena"], $row["taldea"]);
            }
            return $gelak;
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