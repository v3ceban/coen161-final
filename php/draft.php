<?php

function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$entries = ["email","password","eventName","month","year","date","start","end","newEM","curPassword","changePassword","newPassword"];

foreach ($entries as $entry) {
    if (isset($_POST[$entry])) {
        $$entry = sanitize($_POST[$field]);
    }
    else {
        $$entry = "";
    }
}

if (empty($_POST["email"])) {
    $emailErr = "Email is required";
}
else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format";
    }
}

?>
