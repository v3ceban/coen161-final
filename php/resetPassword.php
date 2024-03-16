<?php

if (isset($_POST["email"])) {
  $email = $_POST["email"];
}

// find email in data.json
// if found send email with reset form (might need to create a new html file with this form and a function that will do that)
// (or simulate this somehow, as it's probably too hard to actually implement without a server)

echo $email;
