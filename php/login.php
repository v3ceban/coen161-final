<?php

session_start();

if (isset($_SESSION['userID'])) {
  echo $_SESSION['userID'];
} else {

  if (file_exists("../jsons/data.json")) {
    $data = json_decode(file_get_contents("../jsons/data.json"), true);
  } else {
    echo "JSON file not found\n";
  }

  if (isset($_POST["email"])) {
    $email = $_POST["email"];
    $file = 'data.json';
    file_put_contents($file, $email);
  }

  if (isset($_POST["password"])) {
    $password = $_POST["password"];
    $file = 'data.json';
    file_put_contents($file, $password);
  }

  // if (isset($_SESSION['timeout']) && $_SESSION['timeout'] < time()) {
  //   session_unset();
  //   session_destroy();
  // }
  //
  if (isset($data)) {
    foreach ($data as $key => $value) {
      if ($value["email"] == $email && $value["password"] == $password) {
        $userID = $value["id"];

        break;
      }
    }
  }

  if (isset($userID) && $userID != "") {
    $_SESSION['userID'] = $userID;
    $_SESSION['email'] = $email;
    $_SESSION['password'] = $password;
    // $_SESSION['timeout'] = time() + 15;
    echo $_SESSION['userID'];
  }


}
