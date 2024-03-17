<?php

$id = (int)$_POST['id'];
$name = $_POST['name'];
$participants = array("$_POST[userID]");
$dates = json_decode($_POST['dates']);
$startTimes = json_decode($_POST['startTimes']);
$endTimes = json_decode($_POST['endTimes']);

$eventsData = file_get_contents('../jsons/events.json');
$events = json_decode($eventsData, true);

$eventIndex = null;
foreach ($events as $index => $event) {
  if ($event['id'] == $id) {
    $eventIndex = $index;
    break;
  }
}

$times = [];

foreach ($startTimes as $index => $startTime) {
  $endTime = $endTimes[$index];
  $times[] = array(
    "title" => $participants[0],
    "start" => $startTime,
    "end" => $endTime
  );
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

echo $id;

// echo "ID: $id\nName: $name\nParticipants: $participants[0]\nDates: $dates[0]\nStart Times: $startTimes[0]\nEnd Times: $endTimes[0]\n";
