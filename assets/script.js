// This is our Weather API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

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

//Declare a variable to store the searched city
//var city = "";
// variable declaration
//
var data = '';
var authToken = '';
var spotToken = '';
var searchCity = document.querySelector("#search-city");
var tracksContainer = document.querySelector('#tracks');
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = document.querySelector("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");


// searches the city to see if it exists in the entries from the storage
function find(c) {
  for (var i = 0; i < sCity.length; i++) {
    if (c.toUpperCase() === sCity[i]) {
      return -1;
    }
  }
  return 1;
}
//varible for my apikey
//var APIKey = c951bfd3da7610ddcabde4548ab40daf;
// Display the curent and future weather to the user after grabing the city form the input text box.
function displayWeather(event) {
  console.log("called displayWeather");
  //var city = currentCity.value().trim();

  event.preventDefault();
  if (currentCity.value.trim() !== "") {
    var city = currentCity.value.trim();
    currentWeather(city);
    console.log(city);
  }
}
// Here we create the AJAX call
function currentWeather(city) {
  // Here we build the URL so we can get a data from server side.
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=c951bfd3da7610ddcabde4548ab40daf&units=imperial";
    //TODO confirm passing of query
    console.log(queryURL);
  fetch(queryURL)
    // url:queryURL,
    //method:"GET",
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // parse the response to display the current weather including the City name. the Date and the weather icon.
      console.log(response);
      //Dta object from server side Api for icon property.
      var weathericon = response.weather[0].icon;
      console.log(weathericon);
      var iconurl =
        "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
      // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      var date = new Date(response.dt * 1000).toLocaleDateString();
      //parse the response for name of city and concanatig the date and icon.
      //TODO test passing of city to new data
      $(city).html(
        response.name + "(" + date + ")" + "<img src=" + iconurl + ">"
      );
      // parse the response to display the current temperature.
      // Convert the temp to fahrenheit

      var tempF = response.main.temp;
      $(currentTemperature).html(tempF.toFixed(2) + "°F");
      // Display the Humidity
      $(currentHumidty).html(response.main.humidity + "%");
      //Display Wind speed and convert to MPH
      var ws = response.wind.speed;
      var windsmph = (ws * 2.237).toFixed(1);
      $(currentWSpeed).html(windsmph + "MPH");
      // Display UVIndex.
      //By Geographic coordinates method and using appid and coordinates as a parameter we are going build our uv query url inside the function below.
      UVIndex(response.coord.lon, response.coord.lat);
      //forecast(response.id);
      if (response.cod == 200) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        console.log(sCity);
        if (sCity == null) {
          sCity = [];
          sCity.push(city.toUpperCase());
          localStorage.setItem("cityname", JSON.stringify(sCity));
          addToList(city);
        } else {
          if (find(city) > 0) {
            sCity.push(city.toUpperCase());
            localStorage.setItem("cityname", JSON.stringify(sCity));
            addToList(city);
          }
        }
            //test dynamic html
    $(".city-ico").html("<img src=" + iconurl + ">");        
    $(".city").html("<h1>" + city + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);
      }
    });

}
// This function returns the UVIindex response.
function UVIndex(ln, lt) {
  //lets build the url for uvindex.
  var uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;
  $.ajax({
    url: uvqURL,
    method: "GET",
  }).then(function (response) {
    $(currentUvindex).html(response.value);
  });
}
//BEGIN MARK ADDITION

function getToken() {

fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic Yzk2MTBiMWUxMWNhNGU1YjgzYTFjZWI2N2EyZWZlZDI6ZTE2OGJiZmU1MTA1NDhkMWFjMzBmYjBkNzU1NzM1NWU=',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: 'grant_type=client_credentials'
})
.then(response => response.json())
.then(data => {
    console.log(data.access_token);
    console.log(data);
    authToken = data.access_token;
    console.log(authToken);
    //build track query
    //TODO Build dynamic fetch URL
 //var trackURL = 
 fetch('https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp',{
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+authToken
   },
   //body: grant_type
 })
 .then(response => response.json())
 .then(data => {
   console.log(data);
   console.log(data.name);
   $(".tracks").html("Title: " + data.name);
 })
  
    return authToken;
});

//end MARK ADDITION


searchCity.addEventListener('submit', displayWeather);

  }
//TODO: add spotify search query
function displayTracks(tracksContainer){
for (let i = 0; i < 5; i++) {
  var j = i+1
  var track = document.createElement('h4')
  track.textContent = 'Track '+(j);
  console.log('Track '+(j));
  console.log(track.textContent);
  $(".tracks").text(track.textContent);
  tracksContainer.text(track.textContent);
}
}

getToken();
displayTracks(tracksContainer);
console.log(spotToken);
 