//receive variables from JS 

$file = 'share.json';

if (isset($_GET["emails"])){
    $emails = $_GET["email"];
    $emailsArr = explode("," $emails)
} else {
    $emails = null;
}


foreach ($emails['user'] as $key => $addr) {
    $invitees = array (
        'user' => $emails['user'],
        'email' => $addr
    );
}

file_put_contents($file, json_encode($invitees), JSON_FORCE_OBJECT);

