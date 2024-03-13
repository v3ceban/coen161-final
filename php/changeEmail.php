
$dataArray = file_get_contents('changeEmail.json');
$data = json_decode($dataArray, true);

$email =$data["email"];


$pword = $data["password"];