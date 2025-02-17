<?php

/**
 * intro.php
 */

$daldo_script = "/js/dgp.js";
$daldo_css = "/css/intro.css";

$daldo_redirect = '/d/menu/start';

require __DIR__ . "/header.php";
?>
<body>
    <div id="daldo-intro" class="container">
        <?= $render["content"] ?? "" ?>
        <?= $render["menu_intro"] ?? "" ?>
    </div>
</body>

</html>