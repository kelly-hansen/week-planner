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

$addEntryBtn.addEventListener('click', function(e){
  $modalContainer.className = 'modal-container';
});

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
