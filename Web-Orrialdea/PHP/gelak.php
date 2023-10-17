<?php
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Gela {
        private $id;
        private $izena;
        private $taldea;
    
        public function __construct($id, $izena, $taldea) {
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
    
    if ($_SERVER["REQUEST_METHOD"]=="GET"){
        if (isset($_GET["ezabatu"])){
            ezabatuGela($_GET["ezabatu"]);
        }elseif (isset($_GET["aldatu"])){
            eguneratuGela($_GET["aldatu"], $_GET["izena"], $_GET["taldea"]);
        }elseif (isset($_GET["izena"]) && isset($_GET["taldea"])){
            txertatuGela($_GET["izena"],$_GET["taldea"]);
        }           
    }

    function ezabatuGela($id) {
        global $db;
        $sql = "DELETE FROM gela WHERE id = '$id'";
        $db->ezabatu($sql);
    }

    function eguneratuGela($id, $izena, $taldea) {
        global $db;
        $sql = "UPDATE gela SET izena = '$izena', taldea = '$taldea' WHERE id = '$id'";
        $db->eguneratu($sql);
    }

    function txertatuGela($izena, $taldea) {
        global $db;
        $sql = "INSERT INTO gela (izena, taldea) VALUES ('$izena', '$taldea')";
        $db->txertatu($sql);
    }

    function lortuGelak() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM gela");
        $gelak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $gelak[] = new Gela($row["id"], $row["izena"], $row["taldea"]);
            }
            return $gelak;
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
                <th>ID</th><th>Izena</th><th>Taldea</th>
            </tr>
            <?php
                $emaitzak = lortuGelak();
                if (!empty($emaitzak)) {
                    foreach ($emaitzak as $gela) {
            ?>
            <tr>
                <form action=<?php echo $_SERVER["PHP_SELF"]?> method=" GET">
                    <td><?php echo $gela->getId(); ?></td>
                    <td><input type="text" name="izena" value="<?php echo $gela->getIzena(); ?>"></td>
                    <td><input type="text" name="taldea" value="<?php echo $gela->getTaldea(); ?>"></td>
                    
                    <td><button type="submit" name="aldatu" value="<?php echo $gela->getId(); ?>">Aldatu</button></td>
                    <td><button type="submit" name="ezabatu" value="<?php echo $gela->getId(); ?>">Ezabatu</button></td>
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
            <label>Izena: </label><input type=text name=izena>
            <label>Taldea: </label><input type=text name=taldea>
            <input type=submit value=Bidali>
        </form>
        </div>
    </body>
</html>