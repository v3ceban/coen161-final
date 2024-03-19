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

  $emailExists = false;
  foreach ($usersArray as $user) {
    if ($user["email"] === $email) {
      $emailExists = true;
      break;
    }
  }

  if (!$emailExists) {
    $lastUser = end($usersArray);
    $lastID = $lastUser["id"];
    $userData = array(
      "id" => (string)($lastID + 1),
      "email" => $email,
      "password" => $password
    );
    $usersArray[] = $userData;
    $jsonUserData = json_encode($usersArray, JSON_PRETTY_PRINT);
    file_put_contents('../jsons/data.json', $jsonUserData);
    echo "Account created";
    return;
  } else {
    echo "User already exists";
    return;
  }
}
