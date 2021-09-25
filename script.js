//Declare a variable to store the searched city
var city = "";
// variable declaration
var searchCity = $("#search_city");
var searchButton = $("#search_button");
var latestCity = $("#current_city");
var latestTemperature = $("#temp");
var latestHumidty = $("#humidity");
var latestWSpeed = $("#wind_speed");

var sCity = [];

let playlistOptions = {
  Sunny: "pop",
  Clear: "workout",
  Thunder: "indie_alt",
  Hail: "toplists",
  Snow: "meditation",
  Sleet: "hiphop",
  Cloudy: "country",
};

let button = document.querySelector(".button");
let search_city = document.querySelector(".search_city");
let cityName = document.querySelector(".cityName");
let desc = document.querySelector(".desc");
let temp = document.querySelector(".temp");
let climateContainer = document.getElementById("climateContainer");
let textInput = document.getElementById(".search_city");

// searches the city to see if it exists in the entries from the storage
function find(c) {
  for (var i = 0; i < sCity.length; i++) {
    if (c.toUpperCase() === sCity[i]) {
      return -1;
    }
  }
  return 1;
}
  
//fetches current weather
function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      search_city.value +
      "&units=imperial&appid=2acf688360ef2e4ae9e0ba6153c2285f"
  )
    .then((response) => response.json())
    .then((data) => {
      let nameVal = data["name"];
      let tempVal = data["main"]["temp"];
      let descVal = data["weather"][0]["main"];
      cityName.innerHTML = nameVal;
      temp.innerHTML = tempVal;
      desc.innerHTML = descVal;
      getPlaylist(descVal);
    });
}

//generates a playlist when the page loads
function init() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=chicago&units=imperial&appid=2acf688360ef2e4ae9e0ba6153c2285f"
  )
    .then((response) => response.json())
    .then((data) => {
      let descValue = data["weather"][0]["main"];
      const clientId = "7b1ddde2b4bd4ee182d6a36abe2a35cd";
      const clientSecret = "7774875a0e4c46feb89f46acd70dc278";
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      })
        .then((response) => response.json())
        .then((data) => {
          let weatherCondition = descValue;
          let category = playlistOptions[weatherCondition] || "toplists";
          fetch(
            `https://api.spotify.com/v1/browse/categories/${category}/playlists?limit=10`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer  " + data.access_token,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              let player = document.getElementById("songVariable");
              let randomPlaylist = getRandom(data.playlists.items);
              let randomPlaylistId = randomPlaylist.id;
              player.src = `https://open.spotify.com/embed/playlist/${randomPlaylistId}`;
            });
        });
    });
}

//generates playlist from Spotify
function getPlaylist(descVal) {
  const clientId = "7b1ddde2b4bd4ee182d6a36abe2a35cd";
  const clientSecret = "7774875a0e4c46feb89f46acd70dc278";
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  })
    .then((response) => response.json())
    .then((data) => {
      let weatherCondition = descValue;
      let category = playlistOptions[weatherCondition] || "party";
      fetch(
        `https://api.spotify.com/v1/browse/categories/${category}/playlists?limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer  " + data.access_token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let player = document.getElementById("songVariable");
          let randomPlaylist = getRandom(data.playlists.items);
          let randomPlaylistId = randomPlaylist.id;
          player.src = `https://open.spotify.com/embed/playlist/${randomPlaylistId}`;
        });
    });
}

//randomizes playlists in assigned category
function getRandom(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

//event listeners
button.addEventListener("click", getWeather);
textInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

init();
