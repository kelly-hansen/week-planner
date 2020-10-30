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
var $entrySubmitBtn = document.querySelector('#entry-submit-btn');
var $addEntryForm = document.querySelector('.add-entry-form');
var $dayField = document.querySelector('#day');
var $timeField = document.querySelector('#time');
var $descriptionField = document.querySelector('#description');
var $weekdayDivs = document.querySelectorAll('.weekday');


$addEntryBtn.addEventListener('click', function(e){
  $modalContainer.className = 'modal-container';
});

function pushNewEntry() {
  var newEntryObj = {};
  newEntryObj.time = $timeField.value;
  newEntryObj.description = $descriptionField.value;

  var selectedDay = $dayField.value;
  data.days[selectedDay].push(newEntryObj);
}



$addEntryForm .addEventListener('submit', function(e){
  e.preventDefault();
  $modalContainer.className = 'modal-container hidden';
  pushNewEntry();
  $addEntryForm.reset();
});


window.addEventListener('beforeunload', function () {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data-object', dataJson);
});

window.addEventListener('DOMContentLoaded', function(){
  var previousDataJson = localStorage.getItem('data-object');
  if (previousDataJson !== null) {
    data = JSON.parse(previousDataJson);
  }
});

document.addEventListener('click', dataViewSwap);

function dataViewSwap(e) {
  if (e.target.className === 'weekday') {
    var newDataView = e.target.getAttribute('data-view');
    var $newDayDiv = document.querySelector('[data-view="' + newDataView + '"]');
    $newDayDiv.className = 'weekday day-selected';

    var $prevDayDiv = document.querySelector('[data-view="' + data.view + '"]');
    $prevDayDiv.className = 'weekday';

    data.view = newDataView;
  }
}
