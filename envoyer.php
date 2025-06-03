<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Charger l'autoloader de Composer
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $destinataire = $_POST['destinataire'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);
    
    try {
        // Configuration SMTP (à adapter avec vos paramètres)
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Ex: smtp.gmail.com, smtp.office365.com
        $mail->SMTPAuth = true;
        $mail->Username = 'votre@email.com'; // Votre adresse email
        $mail->Password = 'votre-mot-de-passe'; // Mot de passe de l'email
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS
        $mail->Port = 587; // Port SMTP (587 pour TLS, 465 pour SSL)

        // Expéditeur et destinataire
        $mail->setFrom('votre@email.com', 'Votre Nom ou Société');
        $mail->addAddress($destinataire); // Destinataire du formulaire

        // Contenu de l'email
        $mail->isHTML(false); // Format texte simple
        $mail->Subject = 'Nouveau message depuis votre site';
        $mail->Body = $message;

        // Envoi
        $mail->send();
        echo '<p style="color: green;">Message envoyé avec succès à ' . htmlspecialchars($destinataire) . '.</p>';
    } catch (Exception $e) {
        echo '<p style="color: red;">Erreur : Le message n\'a pas pu être envoyé.</p>';
        echo '<p>Détails : ' . htmlspecialchars($mail->ErrorInfo) . '</p>';
    }

    // Lien de retour
    echo '<br><a href="messagerie.html">Retour à la messagerie</a>';
} else {
    // Redirection si accès direct au script
    header("Location: messagerie.html");
    exit();
}
?>