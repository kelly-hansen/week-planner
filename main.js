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

window.addEventListener('beforeunload', function () {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data-object', dataJson);
});

var previousDataJson = localStorage.getItem('data-object');

if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}
