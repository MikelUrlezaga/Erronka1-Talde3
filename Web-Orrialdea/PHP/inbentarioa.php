<?php
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Inbentarioa {
        private $idEkipamendu;
        private $etiketa;
        private $erosketaData;
        
        public function __construct($etiketa, $idEkipamendu, $erosketaData) {
            $this->etiketa = $etiketa;
            $this->idEkipamendu = $idEkipamendu;
            $this->erosketaData = $erosketaData;
        }

        public function getEtiketa()
        {
        return $this->etiketa;
        }

        public function getIdEkipamendu()
        {
        return $this->idEkipamendu;
        }

        public function getErosketaData()
        {
        return $this->erosketaData;
        }
    }

    if ($_SERVER["REQUEST_METHOD"]=="GET"){
        if (isset($_GET["ezabatu"])){
            ezabatuInbentarioa($_GET["etiketa"]);
        }elseif (isset($_GET["aldatu"])){
            eguneratuInbentarioa($_GET["etiketa"], $_GET["idEkipamendu"], $_GET["erosketaData"]);
        }elseif (isset($_GET["etiketa"])){
            txertatuInbentarioa($_GET["etiketa"], $_GET["idEkipamendu"], $_GET["erosketaData"]);
        }           
    }

    function ezabatuInbentarioa($etiketa) {
        global $db;
        $sql = "DELETE FROM inbentarioa WHERE etiketa = '$etiketa'";
        $db->ezabatu($sql);
    }

    function eguneratuInbentarioa($etiketa, $idEkipamendu, $erosketaData) {
        global $db;
        $sql = "UPDATE inbentarioa SET idEkipamendu = '$idEkipamendu', erosketaData = '$erosketaData' WHERE etiketa = '$etiketa'";
        $db->eguneratu($sql);
    }

    function txertatuInbentarioa($etiketa, $idEkipamendu, $erosketaData) {
        global $db;
        $sql = "INSERT INTO inbentarioa (etiketa, idEkipamendu, erosketaData) VALUES ('$etiketa', '$idEkipamendu', '$erosketaData')";
        $db->txertatu($sql);
    }

    function lortuInbentarioa() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM inbentarioa");
        $inbentarioa = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $inbentarioa[] = new Inbentarioa($row["etiketa"], $row["idEkipamendu"], $row["erosketaData"]);
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
        <table border=1>
            <tr>
                <th>Etiketa</th><th>ID ekipamendu</th><th>Erosketa data</th>
            </tr>
            <?php
                $emaitzak = lortuInbentarioa();
                if (!empty($emaitzak)) {
                    foreach ($emaitzak as $inbentarioa) {
            ?>
            <tr>
                <form action=<?php echo $_SERVER["PHP_SELF"]?> method=" GET">
                <td><input type="text" name="etiketa" value="<?php echo $inbentarioa->getEtiketa(); ?>" readonly></td>
                    <td><input type="text" name="idEkipamendu" value="<?php echo $inbentarioa->getIdEkipamendu(); ?>"></td>
                    <td><input type="text" name="erosketaData" value="<?php echo $inbentarioa->getErosketaData(); ?>"></td>
                    
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
            <label>ID Gela: </label><input type=text name=idEkipamendu>
            <label>Hasiera data: </label><input type=text name=erosketaData>
            <input type=submit value=Bidali>
        </form>
        </div>
    </body>
</html>