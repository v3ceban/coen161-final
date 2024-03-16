<?php

if (isset($_POST["email"])) {
  $email = $_POST["email"];
}

if (isset($_POST["password"])) {
  $password = $_POST["password"];
}

// create a new object with new id in data.json (last id + 1)
// add email and password to this object
// create an empty array of events in this object

echo $email;
