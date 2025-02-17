<?php

/**
 * daldo_news.php
 * 
 * View pour afficher les news agrandies
 * 
 */

$daldo_script = "/js/daldo.js";
$daldo_css = "/css/daldo.css";
$daldo_date = "01/02/2025";

require __DIR__ . "/header.php";
?>

<body>
    <div data-component="MyD">"></div>
    <div data-component="Mobile" data-uri="<?= $www["pref_uri"] ?>" data-ref="<?= $www["nav"] ?>"></div>
    <?php
    echo $render["content"] ?? "";
    require __DIR__ . "/footer.php";
    ?>
</body>

</html>