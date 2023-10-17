<?php
    include "db_konexioa.php";
    $db = new Datubasea();

    class Erabiltzaile{
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

        // public function getNan(){
        //     return $this->nan;
        // }

        // public function getIzena(){
        //     return $this->izena;
        // }

        // public function getAbizena(){
        //     return $this->abizena;
        // }

        public function getErabiltzailea(){
            return $this->erabiltzailea;
        }

        public function getPasahitza(){
            return $this->pasahitza;
        }

        // public function getRola(){
        //     return $this->rola;
        // }
    }

    if ($_SERVER["REQUEST_METHOD"]=="POST"){
        if (isset($_POST["bidali"])){
            erabiltzaileExists($_POST["erabiltzailea"], $_POST["pasahitza"]);
        }
    }

    function lortuDatuak()
    {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM erabiltzailea");
        $erabiltzaileak = array();

        if ($emaitzak !== null) {
            while ($row = $emaitzak->fetch_assoc()) {
                $erabiltzaileak[] = new Erabiltzaile($row["nan"], $row["izena"], $row["abizena"], $row["erabiltzailea"], $row["pasahitza"], $row["rola"]);
            }
        }
        return $erabiltzaileak;
    }
    
    function erabiltzaileExists($erabiltzailea, $pasahitza)
    {
        $erabiltzaileak = lortuDatuak();

        foreach ($erabiltzaileak as $erabiltzaile) {
            if ($erabiltzaile->getErabiltzailea() == $erabiltzailea) {
                if ($pasahitza == $erabiltzaile->getPasahitza()) {
                    // Erabiltzailea eta pasahitza zuzenak dira
                    echo "Sesioan sartu zara.";
                    return true;
                } else {
                    // Pasahitza okerra
                    echo "Pasahitza okerra.";
                    return false;
                }
            }
        }
        // Erabiltzailea ez da aurkitzen
        echo "Erabiltzaile hori ez da existitzen.";
        return false;
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <form action=<?php echo $_SERVER["PHP_SELF"]?> method = "POST">
            <label>Erabiltzailea: </label><input type="text" name = "erabiltzailea">
            <label>Pasahitza: </label><input type="password" name = "pasahitza">
            <button type = "submit" name = "bidali" value = "bidali">Bidali</button>
        </form>
    </body>
</html>