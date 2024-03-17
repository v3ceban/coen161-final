<?php

if (isset($_POST["email"])) {
  $email = $_POST["email"];
}

if (isset($_POST["password"])) {
  $password = $_POST["password"];
}

if (file_exists('../jsons/data.json')) {
  $users = file_get_contents('../jsons/data.json');
  $usersArray = json_decode($users, true);
  if (!empty($usersArray)) {
    $lastUser = end($usersArray);
    $lastID = $lastUser["id"];
    $userData = array(
      "id" => $lastID + 1,
      "email" => $email,
      "password" => $password,
    );
    $jsonUserData = json_encode($userData);
    file_put_contents('../jsons/data.json', $jsonUserData, FILE_APPEND);
  }
}
