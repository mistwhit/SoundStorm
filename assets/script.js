
//Declare a variable to store the searched city
//var city = "";
// variable declaration
//
var data = ''
var searchCity = document.querySelector("#search-city");
//
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
//
var currentCity = document.querySelector("#current-city");
//
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
//TODO capture token in JSON object and use it to pass queries to spotify
//get Spotify Auth token
// var spotifyAuthURL = '"POST" -H "Authorization: Basic Yzk2MTBiMWUxMWNhNGU1YjgzYTFjZWI2N2EyZWZlZDI6ZTE2OGJiZmU1MTA1NDhkMWFjMzBmYjBkNzU1NzM1NWU=" -d grant_type=client_credentials https://accounts.spotify.com/api/token'
// spotifyToken = fetch(spotifyAuthURL);
// console.log(spotifyToken.access_token);

function getToken() {

  //const result = 
//   fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//           'Content-Type' : 'application/x-www-form-urlencoded', 
//           'Authorization' : 'Basic Basic Yzk2MTBiMWUxMWNhNGU1YjgzYTFjZWI2N2EyZWZlZDI6ZTE2OGJiZmU1MTA1NDhkMWFjMzBmYjBkNzU1NzM1NWU='
//       },
//       body: 'grant_type=client_credentials'
//   })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
// }
// getToken();  

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
    console.log(data);
});

//   const data = await result.json();
//   return data.access_token;
// }
// getToken();
// console.log(data.access_token);


//end MARK ADDITION


searchCity.addEventListener('submit', displayWeather);

//var handleFormSubmit = function (event) {
  //  event.preventDefault();
  
  //  var zipInput = zipInputEl.val();
  //  zipInputEl.val('');
  //  console.log(zipInputEl.val());
//}
//console.log(zipInput);
  
/*     if (!zipInput || !dateInput) {
      console.log('You need to fill out the form!');
      return;
    } */
  }
getToken();