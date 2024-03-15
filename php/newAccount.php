<?php

if (isset($_POST["email"])) {
  $email = $_POST["email"];
  // $file = 'data.json';
  // file_put_contents($file, $email);
}

if (isset($_POST["password"])) {
  $password = $_POST["password"];
  // $file = 'data.json';
  // file_put_contents($file, $password);
}

echo $email;
