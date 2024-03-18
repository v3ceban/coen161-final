<?php

$eventID = (int)$_POST['eventID'];
$userID = (string)$_POST['userID'];

$eventsData = file_get_contents('../jsons/events.json');
$events = json_decode($eventsData, true);

$usersData = file_get_contents('../jsons/data.json');
$users = json_decode($usersData, true);

foreach ($events as $key => &$event) {
  if ($event['id'] == $eventID) {
    if (in_array($userID, $event['participants'])) {
      $event['participants'] = array_values(array_diff($event['participants'], [$userID]));
      foreach ($event['times'] as $timeKey => $time) {
        if ($time['title'] == $userID) {
          unset($event['times'][$timeKey]);
        }
      }
      file_put_contents('../jsons/events.json', json_encode($events, JSON_PRETTY_PRINT));
      return;
    } else {
      echo "User not found or already deleted";
      return;
    }
  }
}
