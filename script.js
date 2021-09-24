  //global variables
let playlistOptions = {
  Sunny: "pop",
  Clear: "workout",
  Thunder: "indie_alt",
  Hail: "toplists",
  Snow: "sleep",
  Sleet: "hiphop",
  Cloudy: "country",
};

  //Declare a variable to store the searched city
var city = "";
// variable declaration
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");

var sCity=[];
var APIKey = "166a433c57516f51dfab1f7edaed8413";

            // Here we are building the URL we need to query the database
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c951bfd3da7610ddcabde4548ab40daf&units=imperial";

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              // We store all of the retrieved data inside of an object called "response"
              .then(function (response) {

                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);

                // Transfer content to HTML
                $(".city").html("<h1>" + response.name + " Weather Details</h1>");
                $(".wind").text("Wind Speed: " + response.wind.speed);
                $(".humidity").text("Humidity: " + response.main.humidity);
                $(".temp").text("Temperature (F) " + response.main.temp);

                // Log the data in the console as well
                console.log("Wind Speed: " + response.wind.speed);
                console.log("Humidity: " + response.main.humidity);
                console.log("Temperature (F): " + response.main.temp);
              });
          // start here 

// searches the city to see if it exists in the entries from the storage
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}
//varible for my apikey 
//var APIKey = c951bfd3da7610ddcabde4548ab40daf;
// Display the curent and future weather to the user after grabing the city form the input text box.
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}
// Here we create the fetch call 
function currentWeather(city) {
  // Here we build the URL so we can get a data from server side.
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c951bfd3da7610ddcabde4548ab40daf&units=imperial";
  fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
            
      // parse the response to display the current weather including the City name. the Date and the weather icon. 
      console.log(response);
      // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      var date = new Date(response.dt * 1000).toLocaleDateString();
      //parse the response for name of city and concanatig the date and icon.
      $(currentCity).html(response.name + "(" + date + ")");
  
      // Display the Humidity
      $(currentHumidty).html(response.main.humidity + "%");
          
      //Display Wind speed and convert to MPH
      var ws = response.wind.speed;
      var windsmph = (ws * 2.237).toFixed(1);
      $(currentWSpeed).html(windsmph + "MPH");
      
      forecast(response.id);
      if (response.cod == 200) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        console.log(sCity);
        if (sCity == null) {
          sCity = [];
          sCity.push(city.toUpperCase()
          );
          localStorage.setItem("cityname", JSON.stringify(sCity));
          addToList(city);
        }
        else {
          if (find(city) > 0) {
            sCity.push(city.toUpperCase());
            localStorage.setItem("cityname", JSON.stringify(sCity));
            addToList(city);
          }
        }
      }
    })

}

// render function
function loadlastCity(){
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("cityname"));
    if(sCity!==null){
        sCity=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<sCity.length;i++){
            addToList(sCity[i]);
        }
        city=sCity[i-1];
        currentWeather(city);
    }

}
//Clear the search history from the page
function clearHistory(event){
    event.preventDefault();
    sCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}
//Click Handlers
$("#search-button").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear-history").on("click",clearHistory);





















