// DEPENDENCIES
// =====================================

// Read and set environment variables
require("dotenv").config();

// Import the API keys
var keys = require("./keys");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the axios npm package.
var axios = require("axios");

// Import the moment npm package.
var moment = require("moment");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);


// FUNCTIONS
// =====================================

// Writes to the log.txt file
var writeToLog = function (data) {

  /** FIXME: BONUS
   * 
   * 

      In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

      Make sure you append each command you run to the log.txt file.

      Do not overwrite your file each time you run a command.
    */

  // Append the JSON data and add a newline character to the end of the log.txt file

};

// Function for running a Spotify search

var getMeSpotify = function (songName) {

  if (songName === "") {
    songName = "The Sign";
  };

  spotify
    .search({
      type: 'track',
      query: songName
    })
    .then(function (response) {

      console.log("##########################################################################################");
      console.log("Artist: " + response.tracks.items[0].artists[0].name);
      console.log("Track name: " + response.tracks.items[0].name);
      console.log("Track link: " + response.tracks.items[0].external_urls.spotify);
      console.log("Album name: " + response.tracks.items[0].album.name);
      console.log("##########################################################################################");

    })
    .catch(function (err) {
      console.log("Could not find that song");
    });
};

// Function for concert search

var getMyBands = function (artist) {

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(function (response) {

    var jsonData = response.data;
    if (jsonData.length) {
      var venueName = jsonData[0].venue.name;
      var loc = jsonData[0].venue.city + ", " + jsonData[0].venue.country;
      var uglyDate = jsonData[0].datetime;

      var prettyDate = moment(uglyDate).format("MM/DD/YYYY");

      var logData = [];

      logData.push("Upcoming concerts for " + artist + ":");
      logData.push("Venue: " + venueName);
      logData.push("Location: " + loc);
      logData.push("Date " + prettyDate);

      console.log("##########################################################################################");
      console.log(logData);
      console.log("##########################################################################################");
    } else {
      console.log("Could not find that artist")
    };

  }).catch(function (err) {
    console.log("Could not find that artist");
  });
};

// Function for running a Movie Search

var getMeMovie = function (movieName) {
  if (movieName === "") {
    movieName = "Mr Nobody";
  };

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

  axios.get(urlHit).then(
    function (response) {

      var jsonData = response.data;

      if (jsonData.Response === 'True') {
        console.log("##########################################################################################");
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("IMDB Rating: " + jsonData.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("##########################################################################################");
      } else {
        console.log(jsonData.Error)
      }
    }
  );
};

// Function for running a command based on text file

var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);

    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1].replace(/"/g, ''));
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

    if (error) {
      return console.log(error);
    }
  });
};

// Function for determining which command is executed

var pick = function (command, commandData) {
  // This will be the main function to control which method to call. See function "runThis" is calling this pick method
  switch (command) {
    case 'spotify-this-song':
      getMeSpotify(commandData);
      break;
    case 'concert-this':
      getMyBands(commandData);
      break;
    case 'movie-this':
      getMeMovie(commandData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log("GIVE ME SOMETHING TO WORK WITH!");
  };
};
// Function which takes in command line arguments and executes correct function accordingly

var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));