
// 
require("dotenv").config();

// links key.js file to liri.js file
var keys = require("./keys.js")

// node packages for twitter
var Twitter = require('twitter');

// node package for spotify
var Spotify = require('node-spotify-api');

// link for spotify keys in keys.js file
var spotifyKeys = new Spotify(keys.spotifyKeys);

// node package for rquest 
var request = require('request');

// twitter function
var myTweets = function () {
  // variable to access the twitter node keys in our .env file
  var client = new Twitter(keys.twitterKeys);

  var params = { screen_name: 'Sammie70562893' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
      }
    }
  })
};

myTweets();


var getArtistName = function (artist) {
  return artist.name;
}

// function to get spofity tracks
var getMySpotify = function (songName) {
  spotifyKeys.search({ type: 'track', query: songName },
    function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      // console.log(JSON.stringify(data, null, 2));
      // console.log(data.tracks.items[0]);
      var songs = data.track.items;
      for (var i = 0; i = songs.length; i++) {
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(getArtistName));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log("-----------------------------------------------------");
      }
    });
}
// "apikey=cf60627e"
var getMovie = function (movie) {
  request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData =JSON.parse(body);
      console.log('Title: ' + jsonData.Title);
      console.log('Year: ' + jsonData.Year);
      console.log('IMDB Rating: ' + jsonData.imbdRating);
      console.log('Rotten Tomatoes Rating: ' + jsonData.Ratings.Source[1]);
      console.log('Country: ' + jsonData.Country);
      console.log('Language: ' + jsonData.Language);
      console.log('Plot: ' + jsonData.Plot);
      console.log('Actors: ' + jsonData.Actors);
    } // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

// function to grab tweets when user requests
var pick = function (caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      myTweets();
      break;

    case 'spotify-this-song':
      getMySpotify();
      break;

    case 'movie-this':
      getMovie(functionData);
      break;
    default:
      console.log("Liri does not know this!")
  }
};

var runThis = function (argOne, argTwo) {
  pick[argOne, argTwo];
};
runThis(process.argv[2], process.argv[3]);





