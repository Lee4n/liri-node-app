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

// Helper function that gets the artist name
var getArtistNames = function (artist) {
  return artist.name
};

// Function for running a Spotify search
var getMeSpotify = function (songName) {

  var songName = process.argv[3];

  if (songName === undefined) {
    songName = "The Sign";
  }
  spotify
    .search({
      type: 'track',
      query: songName
    })
    .then(function (response) {

      console.log(response.tracks.items[0].artists[0].name);
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].external_urls.spotify);
      console.log(response.tracks.items[0].album.name);

    })
    .catch(function (err) {
      console.log(err);
    });

  /** TODO: Write the code to execute the command below. 
   * 
   *      node liri.js spotify-this-song '<song name here>'
   * 

    * This will show the following information about the song in your terminal/bash window

        1. Artist(s)

        2. The song's name

        3. A preview link of the song from Spotify

        4. The album that the song is from

    * If no song is provided then your program will default to "The Sign" by Ace of Base.

    * You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

  */
};

// Function for concert search

var getMyBands = function (artist) {

  var artist = process.argv[3];

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(function (response) {

    var jsonData = response.data;

    if (!jsonData.length) {
      console.log("No results found for " + artist);
      return;
    }

    var venueName = jsonData[0].venue.name;
    var loc = jsonData[0].venue.city + ", " + jsonData[0].venue.country;
    var uglyDate = jsonData[0].datetime;

    var prettyDate = moment(uglyDate).format("MM/DD/YYYY");

    console.log(venueName);
    console.log(loc);
    console.log(prettyDate);
  });

  /** TODO: Write the code to execute the command below. 
   * 
   *        node liri.js concert-this <artist/band name here>
   * 
   * This will search the Bands in Town Artist Events API
        1. Name of the venue
        2. Venue location
        3. Date of the Event (use moment to format this as "MM/DD/YYYY")
      Important: There is no need to sign up for a Bands in Town api_id key. Use the codingbootcamp as your app_id. 
   * 
  */
  //FIXME: 
  // var queryURL = "CREATE-THE-URL-HERE";

  // axios.get(queryURL).then(


  //   function (response) {
  //     var jsonData = response.data;

  //     if (!jsonData.length) {
  //       console.log("No results found for " + artist);
  //       return;
  //     }

  //     var logData = [];

  //     logData.push("Upcoming concerts for " + artist + ":");

  //     //FIXME: Finish the code below

  //   }
  // );
};

/** TODO: Write the code to exceute the command below. 
 * 
 *        node liri.js movie-this '<movie name here>'
 * 
 *   This will output the following information to your terminal/bash window:
 * 
      1. Title of the movie.
      2. Year the movie came out.
      3. IMDB Rating of the movie.
      3. Rotten Tomatoes Rating of the movie.
      4. Country where the movie was produced.
      5. Language of the movie.
      6. Plot of the movie.
      7. Actors in the movie.

    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' 
*/
// Function for running a Movie Search
var getMeMovie = function (movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }


  var movieName = process.argv[3];

  //FIXME: 
  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

  axios.get(urlHit).then(
    function (response) {

      var jsonData = response.data;

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
    }
  );
};

// Function for running a command based on text file
var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
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
  //TODO:  Write your code below
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
    default: console.log("This ain't it, Chief.");
  };

};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function (argOne, argTwo) {

  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));