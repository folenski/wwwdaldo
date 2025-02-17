<?php

/**
 * header.php
 *
 * paramètres :
 *  - $www["title"] : titre de la page
 *  - $www["meta"] : description de la page
 *  - $daldo_date : date de la page
 *  - $daldo_style : style de la page
 *  - $daldo_script : script de la page
 *  - $daldo_redirect : redirection
 */

$daldo_date = $daldo_date ?? "28/05/2024";

?>
<!doctype html>
<html lang="<?= $www["lang"] ?>">
<head>
    <?php if (isset($daldo_redirect)) : ?>
    <script> if (typeof Symbol === "undefined") document.location.href = "<?= $daldo_redirect ?>";</script>
    <?php endif; ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="/favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="<?= $daldo_css ?>">
    <title><?= $www["title"] ?></title>
    <meta name="description" content="<?= $www["meta"] ?>">
    <meta name="revised" content="<?= $daldo_date ?>">
    <script src="<?= $daldo_script ?>" defer></script>
</head>