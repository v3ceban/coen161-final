<?php

require_once "login.php";

$userID = $_POST['userID'];
$password = $_POST['password'];
$newPassword = $_POST['newPassword'];
$confirmPassword = $_POST['confirmPassword'];

if (!isset($_SESSION['userID']) || (int)$_SESSION['userID'] !== (int)$userID) {
  echo "Not authorized. UserID: " . $userID . " Session: " . $_SESSION['userID'];
  return;
}

$usersData = file_get_contents('../jsons/data.json');
$users = json_decode($usersData, true);

foreach ($users as &$user) {
  if ($user['id'] == $userID) {
    if ((string)$password === (string)$user['password']) {
      if ((string)$newPassword === (string)$confirmPassword) {
        $user['password'] = $newPassword;
        file_put_contents('../jsons/data.json', json_encode($users, JSON_PRETTY_PRINT));
        return;
      } else {
        echo "Passwords do not match";
        return;
      }
    } else {
      echo "Wrong current password";
      return;
    }
  }
}
