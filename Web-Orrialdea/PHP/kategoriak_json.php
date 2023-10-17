<?php
include "db_konexioa.php";

$db = new Datubasea();

class Kategoria
{
    private $id;
    private $izena;

    public function __construct($id, $izena)
    {
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

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET["get_json_data"])) {
        // Devolver datos JSON al front-end
        $emaitzak = lortuKategoriak();
        echo json_encode($emaitzak);
        exit;
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Manejar solicitudes POST
    $json_data = json_decode(file_get_contents("php://input"), true);

    if (isset($json_data["operation"])) {
        $operation = $json_data["operation"];

        if ($operation === "insert") {
            // Realizar inserción de datos en la base de datos
            if (isset($json_data["izena"])) {
                $izena = $json_data["izena"];
                txertatuKategoria($izena);
            }
        } elseif ($operation === "update") {
            // Realizar actualización de datos en la base de datos
            if (isset($json_data["id"], $json_data["izena"])) {
                $id = $json_data["id"];
                $izena = $json_data["izena"];
                eguneratuKategoria($id, $izena);
            }
        } elseif ($operation === "delete") {
            // Realizar eliminación de datos en la base de datos
            if (isset($json_data["id"])) {
                $id = $json_data["id"];
                ezabatuKategoria($id);
            }
        }
    }
}

function ezabatuKategoria($id)
{
    global $db;
    $sql = "DELETE FROM kategoria WHERE id = '$id'";
    $db->ezabatu($sql);
}

function eguneratuKategoria($id, $izena)
{
    global $db;
    $sql = "UPDATE kategoria SET izena = '$izena' WHERE id = '$id'";
    $db->eguneratu($sql);
}

function txertatuKategoria($izena)
{
    global $db;
    $sql = "INSERT INTO kategoria (izena) VALUES ('$izena')";
    $db->txertatu($sql);
}

function lortuKategoriak()
{
    global $db;
    $emaitzak = $db->datuakLortu("SELECT * FROM kategoria");
    $kategoriak = array();
    if (is_object($emaitzak)) {
        while ($row = $emaitzak->fetch_assoc()) {
            $kategoriak[] = new Kategoria($row["id"], $row["izena"]);
        }
        return $kategoriak;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Gestión de Datos con Fetch API</title>
</head>
<body>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Izena</th>
        </tr>
        <?php
        $emaitzak = lortuKategoriak();
        if (!empty($emaitzak)) {
            foreach ($emaitzak as $kategoria) {
                ?>
                <tr>
                    <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="POST">
                        <td><?php echo $kategoria->getId(); ?></td>
                        <td><input type="text" name="izena" value="<?php echo $kategoria->getIzena(); ?>"></td>
                        <input type="hidden" name="operation" value="update">
                        <input type="hidden" name="id" value="<?php echo $kategoria->getId(); ?>">
                        <td><button type="submit">Actualizar</button></td>
                    </form>
                    <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="POST">
                        <input type="hidden" name="operation" value="delete">
                        <input type="hidden" name="id" value="<?php echo $kategoria->getId(); ?>">
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
        <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="POST" id="sendJsonForm">
            <label for="izena">Izena:</label>
            <input type="text" name="izena" id="izena">
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
