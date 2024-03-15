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
  }

  if (isset($_POST["password"])) {
    $password = $_POST["password"];
  }

  if (isset($data)) {
    foreach ($data as $key => $value) {
      if ($value["email"] == $email && $value["password"] == $password) {
        $userID = $value["id"];
        break;
      }
    }
  }

  // function findUser($email, $password, $file)
  // {
  //   $searchID = $_SESSION['userID'];
  //   foreach ($data as $user) {
  //     if ($user["id"] == $searchID) {
  //       file_put_contents($file, $email);
  //       file_put_contents($file, $password);
  //       return;
  //     }
  //   }
  // }

  if (isset($userID) && $userID != "") {
    $_SESSION['userID'] = $userID;
    $_SESSION['email'] = $email;
    $_SESSION['password'] = $password;
    echo $_SESSION['userID'];
  }
}
