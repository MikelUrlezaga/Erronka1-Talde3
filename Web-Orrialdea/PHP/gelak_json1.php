<?php
    include "db_konexioa.php";

    $db = new Datubasea();

    class Gela
    {
        private $id;
        private $izena;
        private $taldea;

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
        if (isset($_GET["get_json_data"])) {
            // Devolver datos JSON al front-end
            $emaitzak = lortuGelak();
            echo json_encode($emaitzak);
            exit;
        }
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
    <title>Gestión de Datos de Gelak con Fetch API</title>
</head>
<body>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Izena</th>
            <th>Taldea</th>
        </tr>
        <?php
        $emaitzak = lortuGelak();
        if (!empty($emaitzak)) {
            foreach ($emaitzak as $gela) {
                ?>
                <tr>
                    <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="POST">
                        <td><?php echo $gela->getId(); ?></td>
                        <td><input type="text" name="izena" value="<?php echo $gela->getIzena(); ?>"></td>
                        <td><input type="text" name="taldea" value="<?php echo $gela->getTaldea(); ?>"></td>
                        <input type="hidden" name="operation" value="update">
                        <input type="hidden" name="id" value="<?php echo $gela->getId(); ?>">
                        <td><button type="submit">Actualizar</button></td>
                    </form>
                    <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="POST">
                        <input type="hidden" name="operation" value="delete">
                        <input type="hidden" name="id" value="<?php echo $gela->getId(); ?>">
                        <td><button type="submit">Eliminar</button></td>
                    </form>
                </tr>
                <?php
            }
        }
        ?>
    </table>

    <div>
        <h1>Obtener Datos JSON</h1>
        <button id="getJsonButton">Obtener JSON</button>
        <pre id="jsonResult"></pre>
    </div>

    <div>
        <h1>Enviar Datos JSON</h1>
        <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="GET" id="sendJsonForm">
            <label for="izena">Izena:</label>
            <input type="text" name="izena" id="izena">
            <label for="taldea">Taldea:</label>
            <input type="text" name="taldea" id="taldea">
            <input type="hidden" name="operation" value="insert">
            <button type="submit">Insertar</button>
        </form>
    </div>

    <script>
        // Obtener datos JSON desde el servidor
        document.getElementById('getJsonButton').addEventListener('click', function () {
            fetch('<?php echo $_SERVER["PHP_SELF"]; ?>?get_json_data=true')
                .then(response => response.json())
                .then(data => {
                    // Procesa los datos JSON recibidos
                    document.getElementById('jsonResult').textContent = JSON.stringify(data, null, 2);
                })
                .catch(error => {
                    console.error('Error al obtener datos JSON:', error);
                });
        });

        // Enviar datos JSON al servidor a través de una solicitud POST
        document.getElementById('sendJsonForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch('<?php echo $_SERVER["PHP_SELF"]; ?>', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
                .then(response => response.json())
                .then(data => {
                    // Procesa la respuesta del servidor (si es necesario)
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al enviar datos JSON:', error);
                });
        });
    </script>
</body>
</html>
