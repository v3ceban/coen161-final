file = 'dates.json';

if (isset($_GET["month"])){
    $mo = $_GET["month"];
} else {
    $mo = null;
}

if (isset($_GET["year"])){
    $yr = $_GET["year"];
} else {
    $yr = null;
}

if ($mo != NULL && $yr != NULL) {
    $date = array(
        'month'=>$mo, 'year'=>$yr
    );
    $str = json_encode($date);
    file_put_contents($file, $str)
}

file2 = 'time.json';

if (isset($_GET["start"])){
    $start = $_GET["start"];
} else {
    $start = null;
}

if (isset($_GET["end"])){
    $end = $_GET["end"];
} else {
    $end = null;
}

if ($start != NULL && $end != NULL) {
    $times = array(
        'start'=>$start, 'end'=>$end
    );
    $str2 = json_encode($times);
    file_put_contents($file2, $times)
}