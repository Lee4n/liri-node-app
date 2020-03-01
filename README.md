# liri-node-app

1. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. 

2. If users are in a terminal environment, they must first type into the terminal 'node liri.js'. (The 4 commands that are used to run LIRI will follow this first line each time a command is run: 'node liri.js') *application will not run unless Node is installed*

    To run LIRI, the user must always begin the their command with 'node liri.js', then followed by one of the 4 commands, then what the     user wants to search for. Below is an example.

    EXAMPLE OF HOW TO RUN LIRI: 

    node liri.js movie-this "Just Married"

LIRI responds to 4 seperate commands:

[concert-this]

*This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the          terminal:*

    Name of the venue,

    Venue location,

    Date of the event.

[spotify-this-song]

*This will utilize the node-spotify-api package to show the following information about the song in your terminal/bash window:*

    Artist(s)

    The song's name,

    A preview link of the song from Spotify,

    The album that the song is from,

    If no song is provided then your program will default to "The Sign" by Ace of Base.

[movie-this]

*This will retrieve data from the OMDB API and output the following information to your terminal/bash window:*

    Title of the movie,

    Year the movie came out,

    IMDB Rating of the movie,

    Rotten Tomatoes Rating of the movie,

    Country where the movie was produced,

    Language of the movie,

    Plot of the movie,

    Actors in the movie.

    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody'.

[do-what-it-says]

*Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.*
   
3. LINK TO VIDEO OF APP DEMO:

https://vimeo.com/user109153834/review/394712407/2d2e3e730d

4. Technologies used in the app:

    [Javascript],

    [Node.js], 

    [Axios], 

    [fs], 

    [dotenv], 

    [moment], 

    [node-spotify-api],

    [OMDB API],

    [Bands In Town API].


5. I am the sole developer of this application.
