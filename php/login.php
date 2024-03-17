<?php

session_start();

if (isset($_POST["logout"])) {
  session_unset();
  session_destroy();
  echo "logged out";
  return;
}

if (isset($_SESSION['userID'])) {
  echo $_SESSION['userID'];
  return;
}

if (file_exists("../jsons/data.json")) {
  $data = json_decode(file_get_contents("../jsons/data.json"), true);
} else {
  echo "JSON file not found\n";
  return;
}

if (isset($_POST["email"])) {
  $email = $_POST["email"];
} else {
  return;
}

if (isset($_POST["password"])) {
  $password = $_POST["password"];
} else {
  return;
}

if (isset($data)) {
  foreach ($data as $key => $value) {
    if ($value["email"] == $email && $value["password"] == $password) {
      $userID = $value["id"];
      break;
    }
  }
} else {
  return;
}

if (isset($userID) && $userID != "") {
  $_SESSION['userID'] = $userID;
  $_SESSION['email'] = $email;
  $_SESSION['password'] = $password;
  echo $_SESSION['userID'];
} else {
  echo "User not found";
}
