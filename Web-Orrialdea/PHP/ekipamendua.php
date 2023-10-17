<!-- No chuta -->

<?php
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Ekipamendua {
        private $id;
        private $izena;
        private $deskribapena;
        private $marka;
        private $modelo;
        private $stock;
        private $idKategoria;
        
        public function __construct($id, $izena, $deskribapena, $marka, $modelo, $stock, $idKategoria) {
            $this->id = $id;
            $this->izena = $izena;
            $this->deskribapena = $deskribapena;
            $this->marka = $marka;
            $this->modelo = $modelo;
            $this->stock = $stock;
            $this->idKategoria = $idKategoria;
        }

        public function getId()
        {
            return $this->id;
        }

        public function getIzena()
        {
            return $this->izena;
        }

        public function getDeskribapena()
        {
            return $this->deskribapena;
        }

        public function getMarka()
        {
            return $this->marka;
        }

        public function getModelo()
        {
            return $this->modelo;
        }

        public function getStock()
        {
            return $this->stock;
        }

        public function getIdKategoria()
        {
            return $this->idKategoria;
        }
    }

    if ($_SERVER["REQUEST_METHOD"]=="GET"){
        if (isset($_GET["ezabatu"])){
            ezabatuEkipamendua($_GET["id"]);
        }elseif (isset($_GET["aldatu"])){
            eguneratuEkipamendua($_GET["id"], $_GET["izena"], $_GET["deskribapena"], $_GET["marka"], $_GET["modelo"], $_GET["stock"], $_GET["idKategoria"]);
        }elseif (isset($_GET["id"])){
            txertatuEkipamendua( $_GET["id"], $_GET["izena"], $_GET["deskribapena"], $_GET["marka"], $_GET["modelo"], $_GET["stock"], $_GET["idKategoria"]);
        }           
    }

    function ezabatuEkipamendua($id) {
        global $db;
        $sql = "DELETE FROM ekipamendua WHERE id = '$id'";
        $db->ezabatu($sql);
    }

    function eguneratuEkipamendua($id, $izena, $deskribapena, $marka, $modelo, $stock, $idKategoria) {
        global $db;
        $sql = "UPDATE ekipamendua SET izena = '$izena', marka = '$marka', deskribapena = '$deskribapena', modelo = '$modelo', stock = '$stock', idKategoria = '$idKategoria' WHERE id = '$id'";
        $db->eguneratu($sql);
    }

    function txertatuEkipamendua($id, $izena, $deskribapena, $marka, $modelo, $stock, $idKategoria) {
        global $db;
        $sql = "INSERT INTO ekipamendua (id, izena, deskribapena, marka, modelo, stock, idKategoria) VALUES ('$id', '$izena', '$deskribapena', '$marka', '$modelo', '$stock', '$idKategoria')";
        $db->txertatu($sql);
    }

    function lortuEkipamendua() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM ekipamendua");
        $ekipamendua = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $ekipamendua[] = new Ekipamendua($row["id"], $row["izena"], $row["deskribapena"], $row["marka"],  $row["modelo"], $row["stock"], $row["idKategoria"]);
            }
            return $ekipamendua;
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
                <th>ID</th><th>Izena</th><th>Deskribapena</th><th>Marka</th><th>Modelo</th><th>Stock</th><th>ID Kategoria</th>
            </tr>
            <?php
                $emaitzak = lortuEkipamendua();
                if (!empty($emaitzak)) {
                    foreach ($emaitzak as $ekipamendua) {
            ?>
            <tr>
                <form action=<?php echo $_SERVER["PHP_SELF"]?> method=" GET">
                    <td><input type="text" name="id" value="<?php echo $ekipamendua->getId(); ?>" readonly></td>
                    <td><input type="text" name="izena" value="<?php echo $ekipamendua->getIzena(); ?>"></td>
                    <td><input type="text" name="deskribapena" value="<?php echo $ekipamendua->getDeskribapena(); ?>"></td>
                    <td><input type="text" name="marka" value="<?php echo $ekipamendua->getMarka(); ?>"></td>
                    <td><input type="text" name="modelo" value="<?php echo $ekipamendua->getModelo(); ?>"></td>
                    <td><input type="text" name="stock" value="<?php echo $ekipamendua->getStock(); ?>"></td>
                    <td><input type="text" name="idKategoria" value="<?php echo $ekipamendua->getIdKategoria(); ?>"></td>
                    
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
                <label>ID: </label><input type=text name=id>
                <label>Izena: </label><input type=text name=izena>
                <label>Deskribapena: </label><input type=text name=deskribapena>
                <label>Marka: </label><input type=text name=marka>
                <label>Modelo: </label><input type=text name=modelo>
                <label>Stock: </label><input type=text name=stock>
                <label>ID Kategoria: </label><input type=text name=idKategoria>
                <input type=submit value=Bidali>
            </form>
        </div>
    </body>
</html>