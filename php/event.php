$file = 'event.json';

if (isset($_GET["event"])){
    $eventName = $_GET["event"];
} else {
    $eventName = null;
}

if ($eventName != NULL) {
    $data = 'name'=>$eventName;
    $str = json_encode($data);
    file_put_contents($file, $str)
}
