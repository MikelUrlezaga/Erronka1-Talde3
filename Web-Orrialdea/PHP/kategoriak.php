<?php
    include "db_konexioa.php";

    $db = new Datubasea ();

    class Kategoria {
        private $id;
        private $izena;
    
        public function __construct($id, $izena) {
            $this->id = $id;
            $this->izena = $izena;
        }

        public function getId()
        {
        return $this->id;
        }

        public function getIzena()
        {
        return $this->izena;
        }
    }

    
    
    if ($_SERVER["REQUEST_METHOD"]=="GET"){
        if (isset($_GET["ezabatu"])){
            ezabatuKategoria($_GET["ezabatu"]);
        }elseif (isset($_GET["aldatu"])){
            eguneratuKategoria($_GET["aldatu"], $_GET["izena"]);
        }elseif (isset($_GET["izena"])){
            txertatuKategoria($_GET["izena"]);
        }           
    }

    function ezabatuKategoria($id) {
        global $db;
        $sql = "DELETE FROM kategoria WHERE id = '$id'";
        $db->ezabatu($sql);
    }

    function eguneratuKategoria($id, $izena) {
        global $db;
        $sql = "UPDATE kategoria SET izena = '$izena' WHERE id = '$id'";
        $db->eguneratu($sql);
    }

    function txertatuKategoria($izena) {
        global $db;
        $sql = "INSERT INTO kategoria (izena) VALUES ('$izena')";
        $db->txertatu($sql);
    }

    function lortuKategoriak() {
        global $db;
        $emaitzak = $db->datuakLortu("SELECT * FROM kategoria");
        $kategoriak = array();
        if (is_object($emaitzak)) {
            while ($row = $emaitzak->fetch_assoc()) {
                $kategoriak[] = new Kategoria($row["id"], $row["izena"]);
            }
            return $kategoriak;
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
                <th>ID</th><th>Izena</th>
            </tr>
            <?php
                $emaitzak = lortuKategoriak();
                if (!empty($emaitzak)) {
                    foreach ($emaitzak as $kategoria) {
            ?>
            <tr>
                <form action=<?php echo $_SERVER["PHP_SELF"]?> method=" GET">
                    <td><?php echo $kategoria->getId(); ?></td>
                    <td><input type="text" name="izena" value="<?php echo $kategoria->getIzena(); ?>"></td>
                    
                    <td><button type="submit" name="aldatu" value="<?php echo $kategoria->getId(); ?>">Aldatu</button></td>
                    <td><button type="submit" name="ezabatu" value="<?php echo $kategoria->getId(); ?>">Ezabatu</button></td>
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
            <input type=submit value=Bidali>
        </form>
        </div>
    </body>
</html>