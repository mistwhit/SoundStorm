var formEl = $('#user-zip');
var zipInputEl = $('#zip-number');


formEl.on('submit', handleFormSubmit);

var handleFormSubmit = function (event) {
    event.preventDefault();
  
    var zipInput = zipInputEl.val();
    zipInputEl.val('');
    console.log(zipInputEl.val());
}
//console.log(zipInput);
  
/*     if (!zipInput || !dateInput) {
      console.log('You need to fill out the form!');
      return;
    } */