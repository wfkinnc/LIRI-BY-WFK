/*
node js application to take input and peform actions
1. 
2.
3.
4.

*/



// importing the keys file
var keys  = require("./keys.js");
// pulling in the inquirer class to get user response
var liriIinquirer = require("inquirer");

    // Here we give the user a list to choose from.
var inqList = [{
      type: "list",
      message: "What do you want LIRI to do?",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "LIRI"
    }];

var inqInput = [{
	type: "input",
	message: "Please enter something:",
	name: "enteredValue"

}];   

// Create a "Prompt" with a series of questions.
liriIinquirer.prompt(inqList)
  .then(function(inquirerResponse) {
 
    console.log(inquirerResponse.LIRI);

    switch(inquirerResponse.LIRI){

      case "my-tweets":

      var Twitter = require('twitter');
 
      var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret

  });

      var params = {screen_name: 'wfkinnc'};
      client.get('statuses/user_timeline', params, function(error, tweets,response) {
      if (error){

        console.log(error);
        return;
      }//end if (error)
      if (!error) {
        // loopiong thru the tweets response to text
         for ( var index in tweets){
          console.log(tweets[index].text)
         }
      console.log(response);
      }
      });
      break;

    	case "spotify-this-song":

      liriIinquirer.prompt(inqInput)
      .then(function(spotifyResponse){

        console.log(" before requested " + spotifyResponse.enteredValue);

        var spotResponse = (spotifyResponse.enteredValue === '') ? "The Sign" : spotifyResponse.enteredValue;
        console.log(" requested " + spotResponse);

        // creating the constuction and variable
        var Spotify = require('node-spotify-api');

          // creating spotify variable..
        var spotify    = new Spotify({

            id: keys.spotifyKeys.clientId,
            secret: keys.spotifyKeys.clientSecret

        });

        // getting the data 
        spotify
          .search({ type: 'track', query: spotResponse, limit: 5})
          .then(function(response) {
            // READING THRU THE JSON RESPONSE DOCUMENT
             for (var index in response.tracks.items){
                 console.log("------------------ " + index + "-------------------")
                 console.log("Song Name: " + response.tracks.items[index].name);
                 console.log("Artist: " + response.tracks.items[index].album.artists[0].name);
                 console.log("Spotify URL: " + response.tracks.items[index].album.artists[0].href);
                 console.log("Album: " + response.tracks.items[index].album.name);

            }
           }) 

          .catch(function(err) {
            console.log(err);
          });
      })

// console.log(" spot0")
    	break;

    	case "movie-this":

console.log(" movie")
    	break;
    	case "do-what-it-says":

console.log(" do ")
    	break ;
    } //end switfh

  }); // end liriInquire



