<?php

/**
 * daldo.php
 * 2025-03-02 : remove news section
 * 
 */

$daldo_script = "/js/daldo.js";
$daldo_css = "/css/daldo.css";
$daldo_date = "01/02/2025";

require __DIR__ . "/header.php";
?>

<body>
    <div data-component="MyD"><!--Header--></div>
    <?php
    echo $render["content"] ?? "";
    require __DIR__ . "/footer.php";
    ?>
</body>

</html>