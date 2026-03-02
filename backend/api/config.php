<?php
header("Access-Control-Allow-Origin: https://oneclic.inkart.fr");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
require __DIR__ . '/../vendor/autoload.php';

use Kreait\Firebase\Factory;
$serviceAccountPath = __DIR__ . '/../firebase-credentials.json';
$databaseUri = 'https://oneclic-3ede8-default-rtdb.europe-west1.firebasedatabase.app/';

try {
    $factory = (new Factory)
        ->withServiceAccount($serviceAccountPath)
        ->withDatabaseUri($databaseUri);
    $auth = $factory->createAuth();
    $database = $factory->createDatabase();

} catch (\Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Erreur de connexion a Firebase : ' . $e->getMessage()]);
    exit;
}

// Fonction utilitaire pour envoyer du JSON
function envoyerJson($donnees, $statut = 200)
{
    header('Content-Type: application/json');
    http_response_code($statut);
    echo json_encode($donnees);
    exit;
}

// Fonction pour récupérer le header Authorization
function obtenirJetonPorteur()
{
    $enTetes = getallheaders();
    if (isset($enTetes['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $enTetes['Authorization'], $correspondances)) {
            return $correspondances[1];
        }
    }
    return null;
}
?>