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
var $cancelAddingBtn = document.querySelector('#cancel-adding-btn');

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

$cancelAddingBtn.addEventListener('click', function () {
  $modalContainer.className = 'modal-container hidden';
  $addEntryForm.reset();
});

function renderDataViewHTML(newDataView) {
  var $dataViewContDiv = document.createElement('div');
  $dataViewContDiv.className = 'data-view-cont';

  var $h2Div = document.createElement('div');
  $h2Div.className = 'row';
  $dataViewContDiv.appendChild($h2Div);

  var $h2 = document.createElement('h2');
  $h2.textContent = 'Scheduled Events for ' + newDataView.charAt(0).toUpperCase() + newDataView.slice(1);
  $h2Div.appendChild($h2);

  var $tableDiv = document.createElement('div');
  $tableDiv.className = 'row table-cont';
  $dataViewContDiv.appendChild($tableDiv);

  var $table = document.createElement('table');
  $tableDiv.appendChild($table);

  var $thead = document.createElement('thead');
  $table.appendChild($thead);

  var $trHead = document.createElement('tr');
  $thead.appendChild($trHead);

  var $thTime = document.createElement('th');
  $thTime.textContent = 'Time';
  $trHead.appendChild($thTime);

  var $thDescription = document.createElement('th');
  $thDescription.textContent = 'Description';
  $trHead.appendChild($thDescription);

  var $tbody = document.createElement('tbody');
  $table.appendChild($tbody);

  for (var i = 0; i < 8; i++) {
    var $trTemplate = document.createElement('tr');

    var $td1 = document.createElement('td');
    $trTemplate.appendChild($td1);

    var $td2 = document.createElement('td');
    $trTemplate.appendChild($td2);
    $tbody.appendChild($trTemplate);
  }

  return $dataViewContDiv;

  // need to check this render for accuracy, call in dataViewSwap, appending to main element and removing any existing
}

function dataViewSwap(newDataView) {
  var $prevDayDiv = document.querySelector('[data-view="' + data.view + '"]');
  $prevDayDiv.className = 'weekday';
  var $newDayDiv = document.querySelector('[data-view="' + newDataView + '"]');
  $newDayDiv.className = 'weekday day-selected';
  data.view = newDataView;
  var $main = document.querySelector('main');
  var $dataViewDiv = document.querySelector('.data-view-cont');
  if ($dataViewDiv) {
    $main.removeChild($dataViewDiv);
  }
  $main.appendChild(renderDataViewHTML(newDataView));
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
