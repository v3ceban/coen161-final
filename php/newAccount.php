<?php

if (isset($_POST["email"])) {
  $email = $_POST["email"];
}

if (isset($_POST["password"])) {
  $password = $_POST["password"];
}

$curID = 0; 

if (file_exists('data.json')) {
//determine last id
  $users = file_get_contents('data.json');
  json_decode($users, true);
  foreach ($users as $user) {
    $curID++;
  }
}

// create a new object with new id in data.json (last id + 1)
$userData = array(
  "id" => curID + 1,
  "email" => $email, 
  "password" => $password,
  "events" => [] // create an empty array of events in this object
);

$jsonUserData = json_encode($userData);
file_put_contents('data.json', $jsonUserData);

?>
