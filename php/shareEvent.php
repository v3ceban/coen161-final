<?php

$name = $_POST['name'];
$email = $_POST['email'];

$eventsData = file_get_contents('../jsons/events.json');
$events = json_decode($eventsData, true);

$usersData = file_get_contents('../jsons/data.json');
$users = json_decode($usersData, true);

$userID = null;

foreach ($users as $key => $user) {
  if ($user['email'] == $email) {
    $userID = $user['id'];
    break;
  }
}

if ($userID === null) {
  echo "User not found";
  return;
}

foreach ($events as $key => $event) {
  if ($event['name'] == $name) {
    if (!in_array($userID, $event['participants'])) {
      $events[$key]['participants'][] = (string)$userID;
      file_put_contents('../jsons/events.json', json_encode($events, JSON_PRETTY_PRINT));
      return;
    } else {
      echo "This user is already invited";
      return;
    }
  }
}
