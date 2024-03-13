//receive variables from JS 

$file = 'login.json';

if (isset($_GET["email"])){
    $email = $_GET["email"];
} else {
    $email = null;
}

if (isset($_GET["passw"])){
    $pword = $_GET["passw"];
} else {
    $pword = null;
}

if ($email != NULL && $pword != NULL) {
    $data = array(
        'email'=>$email, 'password'=>$pword
    );
    $str = json_encode($data);
    file_put_contents($file, $str)
}

