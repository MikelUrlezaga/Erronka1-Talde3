<!-- No chuta -->

<?php
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Erabiltzailea {
        private $nan;
        private $izena;
        private $abizena;
        private $erabiltzailea;
        private $pasahitza;
        private $rola;
        
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
        if (isset($_GET["ezabatu"])){
            ezabatuErabiltzailea($_GET["nan"]);
        }elseif (isset($_GET["aldatu"])){
            eguneratuErabiltzailea($_GET["nan"], $_GET["izena"], $_GET["abizena"], $_GET["erabiltzailea"], $_GET["pasahitza"], $_GET["rola"]);
        }elseif (isset($_GET["nan"])){
            txertatuErabiltzailea( $_GET["nan"], $_GET["izena"], $_GET["abizena"], $_GET["erabiltzailea"], $_GET["pasahitza"], $_GET["rola"]);
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
        $erabiltzailea = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $Erabiltzailea[] = new Erabiltzailea($row["nan"], $row["izena"], $row["abizena"], $row["erabiltzailea"],  $row["pasahitza"], $row["rola"]);
            }
            return $Erabiltzailea;
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
                <th>NAN</th><th>Izena</th><th>Abizena</th><th>Erabiltzailea</th><th>Pasahitza</th><th>Rola</th>
            </tr>
            <?php
                $emaitzak = lortuErabiltzailea();
                if (!empty($emaitzak)) {
                    foreach ($emaitzak as $erabiltzailea) {
            ?>
            <tr>
                <form action=<?php echo $_SERVER["PHP_SELF"]?> method=" GET">
                <td><input type="text" name="nan" value="<?php echo $erabiltzailea->getNan(); ?>" readonly></td>
                    <td><input type="text" name="izena" value="<?php echo $erabiltzailea->getIzena(); ?>"></td>
                    <td><input type="text" name="abizena" value="<?php echo $erabiltzailea->getAbizena(); ?>"></td>
                    <td><input type="text" name="erabiltzailea" value="<?php echo $erabiltzailea->getErabiltzailea(); ?>"></td>
                    <td><input type="text" name="pasahitza" value="<?php echo $erabiltzailea->getPasahitza(); ?>"></td>
                    <td><input type="text" name="rola" value="<?php echo $erabiltzailea->getRola(); ?>"></td>
                    
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
            <label>NAN: </label><input type=text name=nan>
            <label>Izena: </label><input type=text name=izena>
            <label>Abizena: </label><input type=text name=abizena>
            <label>Erabiltzailea: </label><input type=text name=erabiltzailea>
            <label>Pasahitza: </label><input type=text name=pasahitza>
            <label>Rola: </label><input type=text name=rola>
            <input type=submit value=Bidali>
        </form>
        </div>
    </body>
</html>