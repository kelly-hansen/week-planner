var data = {
  view: 'monday',
  days: {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  }
};

var $addEntryBtn = document.querySelector('#addEntryBtn');
var $modalContainer = document.querySelector('.modal-container');
var $addEntryForm = document.querySelector('.add-entry-form');
var $dayField = document.querySelector('#day');
var $timeField = document.querySelector('#time');
var $descriptionField = document.querySelector('#description');

$addEntryBtn.addEventListener('click', function (e) {
  $modalContainer.className = 'modal-container';
});

function pushNewEntry() {
  var newEntryObj = {};
  newEntryObj.time = $timeField.value;
  newEntryObj.description = $descriptionField.value;

  var selectedDay = $dayField.value;
  data.days[selectedDay].push(newEntryObj);
}

$addEntryForm.addEventListener('submit', function (e) {
  e.preventDefault();
  $modalContainer.className = 'modal-container hidden';
  pushNewEntry();
  $addEntryForm.reset();
});

function dataViewSwap(newDataView) {
  var $prevDayDiv = document.querySelector('[data-view="' + data.view + '"]');
  $prevDayDiv.className = 'weekday';
  var $newDayDiv = document.querySelector('[data-view="' + newDataView + '"]');
  $newDayDiv.className = 'weekday day-selected';
  data.view = newDataView;
}

function weekdaySwitcher(e) {
  if (e.target.className !== 'weekday') {
    return;
  }
  var newDataView = e.target.getAttribute('data-view');
  dataViewSwap(newDataView);
}

document.addEventListener('click', weekdaySwitcher);

window.addEventListener('DOMContentLoaded', function () {
  var previousDataJson = localStorage.getItem('data-object');
  if (previousDataJson !== null) {
    data = JSON.parse(previousDataJson);
  }
  dataViewSwap('monday');
});

window.addEventListener('beforeunload', function () {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data-object', dataJson);
});
