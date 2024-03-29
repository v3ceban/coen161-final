<?php

require_once "login.php";

$id = (int)$_POST['id'];
$userID = (int)$_POST['userID'];
$name = $_POST['name'];
$dates = json_decode($_POST['dates']);
$times = json_decode($_POST['times']);

if (!isset($_SESSION['userID']) || (int)$_SESSION['userID'] !== (int)$userID) {
  echo "Not authorized";
  return;
}

$eventsData = file_get_contents('../jsons/events.json');
$events = json_decode($eventsData, true);

$usersData = file_get_contents('../jsons/data.json');
$users = json_decode($usersData, true);

foreach ($times as $time) {
  if ($time->title == "You") {
    $time->title = (string)$userID;
  }
  foreach ($users as $user) {
    if ($user['email'] == $time->title) {
      $time->title = $user['id'];
    }
  }
}

$eventIndex = null;
foreach ($events as $index => $event) {
  if ($event['name'] === $name) {
    $id = $event['id'];
    $eventIndex = $index;
    break;
  }
}

$participants = [];

foreach ($times as $time => $participant) {
  if (!in_array($participant->title, $participants)) {
    $participants[] = $participant->title;
  }
}

if (!in_array($userID, $participants)) {
  $participants[] = (string)$userID;
}

$newEvent = array(
  "id" => $id,
  "name" => $name,
  "participants" => $participants,
  "dates" => $dates,
  "times" => $times
);

if ($eventIndex !== null) {
  $events[$eventIndex] = $newEvent;
} else {
  $events[] = $newEvent;
}

file_put_contents('../jsons/events.json', json_encode($events, JSON_PRETTY_PRINT));

echo "$name";
