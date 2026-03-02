<?php
require __DIR__ . '/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['action']) || !isset($input['email']) || !isset($input['password'])) {
    envoyerJson(['error' => 'Champs manquants'], 400);
}

$action = $input['action']; // 'register' ou 'login'
$email = $input['email'];
$motDePasse = $input['password'];

try {
    if ($action === 'register') {
        $proprietesUtilisateur = [
            'email' => $email,
            'emailVerified' => false,
            'password' => $motDePasse,
            'displayName' => isset($input['username']) ? $input['username'] : explode('@', $email)[0],
            'disabled' => false,
        ];

        $utilisateurCree = $auth->createUser($proprietesUtilisateur);
        envoyerJson(['success' => true, 'message' => 'Compte créé avec succès', 'uid' => $utilisateurCree->uid]);

    } elseif ($action === 'login') {
         $resultatConnexion = $auth->signInWithEmailAndPassword($email, $motDePasse);

        $jeton = $resultatConnexion->idToken();
        $uid = $resultatConnexion->firebaseUserId();

        envoyerJson([
            'success' => true,
            'token' => $jeton,
            'uid' => $uid
        ]);

    } else {
        envoyerJson(['error' => 'Action inconnue'], 400);
    }

} catch (\Kreait\Firebase\Exception\Auth\EmailExists $e) {
    envoyerJson(['error' => 'Cet email est déjà utilisé.'], 400);
} catch (\Kreait\Firebase\Exception\Auth\InvalidPassword $e) {
    envoyerJson(['error' => 'Mot de passe incorrect.'], 401);
} catch (\Kreait\Firebase\Exception\Auth\UserNotFound $e) {
    envoyerJson(['error' => 'Utilisateur introuvable.'], 404);
} catch (\Exception $e) {
    envoyerJson(['error' => 'Erreur d\'authentification : ' . $e->getMessage()], 500);
}
?>