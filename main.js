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

$addEntryBtn.addEventListener('click', function(e){
  $modalContainer.className = 'modal-container';
});

function pushNewEntry(day) {
  var newEntryObj = {};
  newEntryObj.time = $timeField.value;
  newEntryObj.description = $descriptionField.value;

}

$entrySubmitBtn.addEventListener('click', function(){
  $modalContainer.className = 'modal-container hidden';
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
