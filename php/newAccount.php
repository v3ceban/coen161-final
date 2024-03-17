<?php

if (isset($_POST["email"])) {
  $email = $_POST["email"];
}

if (isset($_POST["password"])) {
  $password = $_POST["password"];
}

if (file_exists('data.json')) {
//determine last id
  $users = file_get_contents('data.json');
  $usersArray = json_decode($users, true);
  if (!empty($usersArray)) {
    $lastUser = end($usersArray);
    $lastID = $lastUser["id"]; }
    // create a new object with new id in data.json (last id + 1)
  $userData = array(
    "id" => $lastID + 1,
    "email" => $email, 
    "password" => $password,
    "events" => [] // create an empty array of events in this object
  );
}


$jsonUserData = json_encode($userData);
file_put_contents('data.json', $jsonUserData);

?>
