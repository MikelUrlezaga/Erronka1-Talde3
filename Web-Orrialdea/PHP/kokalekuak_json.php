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
            $emaitzak = lortuKokalekuaById($_GET["num"]);
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

    function ezabatuKokalekua($etiketa, $hasieraData) {
        global $db;
        $sql = "DELETE FROM kokalekua WHERE etiketa = '$etiketa' AND hasieraData = '$hasieraData'";
        $db->ezabatu($sql);
    }

    function eguneratuKokalekua($etiketa, $idGela, $hasieraData, $amaieraData) {
        global $db;
        $sql = "UPDATE kokalekua SET idGela = '$idGela', amaieraData = '$amaieraData' WHERE etiketa = '$etiketa' AND hasieraData = '$hasieraData'";
        $db->eguneratu($sql);
    }

    function txertatuKokalekua($etiketa, $idGela, $hasieraData, $amaieraData) {
        global $db;
        $sql = "INSERT INTO kokalekua (etiketa, idGela, hasieraData, amaieraData) VALUES ('$etiketa', '$idGela', '$hasieraData', '$amaieraData')";
        $db->txertatu($sql);
    }

    function lortuKokalekuak() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM kokalekua");
        $kokalekuak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $kokalekuak[] = new Kokalekua($row["etiketa"], $row["idGela"], $row["hasieraData"], $row["amaieraData"]);
            }
            return $kokalekuak;
        }else{
            //echo "".$emaitzak;
        }
        
    }

?>
<html>
    <head>
    </head>
    <body>
        <table border=1>
            <tr>
                <th>Etiketa</th><th>ID gela</th><th>Hasiera data</th><th>Amaiera data</th>
            </tr>
            <?php
                $emaitzak = lortuKokalekuak();
                if (!empty($emaitzak)) {
                    foreach ($emaitzak as $kokalekua) {
            ?>
            <tr>
                <form action=<?php echo $_SERVER["PHP_SELF"]?> method=" GET">
                <td><input type="text" name="etiketa" value="<?php echo $kokalekua->getEtiketa(); ?>" readonly></td>
                    <td><input type="text" name="idGela" value="<?php echo $kokalekua->getIdGela(); ?>"></td>
                    <td><input type="text" name="hasieraData" value="<?php echo $kokalekua->getHasieraData(); ?>" readonly></td>
                    <td><input type="text" name="amaieraData" value="<?php echo $kokalekua->getAmaieraData(); ?>"></td>
                    
                    <td><button type="submit" name="aldatu" value="">Aldatu</button></td>
                    <td><button type="submit" name="ezabatu" value="">Ezabatu</button></td>
                </form>
            </tr>
            <?php    
                    }
                }
            ?>
        </table>
        <br>
        <div>
        <form action=<?php echo $_SERVER["PHP_SELF"]?> method="GET">
            <label>Etiketa: </label><input type=text name=etiketa>
            <label>ID Gela: </label><input type=text name=idGela>
            <label>Hasiera data: </label><input type=text name=hasieraData>
            <label>Amaiera data: </label><input type=text name=amaieraData>
            <input type=submit value=Bidali>
        </form>
        </div>
    </body>
</html>