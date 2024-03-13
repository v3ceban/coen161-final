//receive variables from JS 

$file = 'changeEmail.json';

if (isset($_GET["current"])){
    $cur = $_GET["current"];
} else {
    $cur = null;
}

if (isset($_GET["new"])){
    $new = $_GET["new"];
} else {
    $new = null;
}

if (isset($_GET["confirm"])){
    $confirm = $_GET["confirm"];
} else {
    $confirm = null;
}

if ($cur != NULL && $new != NULL && $confirm != NULL) {
    $data = array(
        'current'=>$cur, 
        'new'=>$new,
        'confirm'=>confirm
    );
    $str = json_encode($data);
    file_put_contents($file, $str)
}