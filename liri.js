/*
node js application to take input and peform actions
1. if tweets, returns tweets from twitter. 
2. if spotify, prompts for song and returns song info
3. if movie, prompts for moving and returns movie info
4. if do what it says, then gets song info from the song in ghe random.txt fil

it logs data also.
*/



// importing the keys file
var keys  = require("./keys.js");
var fs    = require("fs");
var printString = "";

// pulling in the inquirer class to get user response
var liriIinquirer = require("inquirer");

    // Here we give the user a list to choose from.
var inqList = [{
      type: "list",
      message: "What do you want LIRI to do?",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "LIRI"
    }];
// the message is set inside the method..
var inqInput = [{
	type: "input",
	message: "",
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
        // loopiong thru the tweets response to text
         for ( var index in tweets){
          printString ="Tweet: "  + tweets[index].text; 
          console.log(printString);
          printToLog(printString);
          printString = "Created on: " + tweets[index].created_at;
          console.log(printString);
          printToLog(printString);
         }
      });
      break;

    	case "spotify-this-song":
      // setting hte messing in inqInput
      //
      inqInput[0].message = "PLease enter a Song:";
      liriIinquirer.prompt(inqInput)
      .then(function(spotifyResponse){


        var spotResponse = (spotifyResponse.enteredValue === '') ? "The Sign" : spotifyResponse.enteredValue;

        // creating the constuction and variable
        getSpotify(spotResponse);
        
      });// end liriInquire

    	break;

    	case "movie-this":
      // gets movie from node request..
      inqInput[0].message = "Please enter a Movie:";
      var omdbURL = "http://www.omdbapi.com/";
      //?t=tt3896198&apikey=e5945912
          liriIinquirer.prompt(inqInput)
          .then(function(movieResponse){


            var movieResponse = (movieResponse.enteredValue === '') ? "Mr. Nobody" : movieResponse.enteredValue;
            omdbURL = omdbURL + "?t=" + movieResponse + "&apikey=" + keys.omdbKeys.apiKey;

            console.log(omdbURL);

            //getting movie info

            var request = require("request");
            request(omdbURL,function(err,movResponse,movBody){

              if(err){

                console.log(err);
                return
              }

              if (movResponse.Response){

                  // creaing JSON object from returned string
                  var movieObject = JSON.parse(movBody);
                  printString ="Movie Title: " + movieObject.Title;
                  console.log(printString);
                  printToLog(printString);

                  printString ="Year the movie came out: " + movieObject.Year;
                  console.log(printString);
                  printToLog(printString);

                  printString ="IMDB Rating of the movie: " + movieObject.Ratings[0].Value;
                  console.log(printString);
                  printToLog(printString);

                  printString ="Rotten Tomatoes Rating of the movie: " + movieObject.Ratings[1].Value;
                  console.log(printString);
                  printToLog(printString);

                  printString ="Country where the movie was produced: " + movieObject.Country;
                  console.log(printString);
                  printToLog(printString);

                  printString ="Language of the movie: " + movieObject.Language;
                  console.log(printString);
                  printToLog(printString);

                  printString ="Plot of the movie: " + movieObject.Plot;
                  console.log(printString);
                  printToLog(printString);

                  printString ="Actors in the movie: " + movieObject.Actors;
                  console.log(printString);
                  printToLog(printString);

              } else {

                console.log("movie not found!");
              }// end if
            })// end requeat




          })// end liriIinquirer

    	break;
    	case "do-what-it-says":
      //
      // gets the name of the song to searh from random text
      //
      var fs = require('fs'); 
      fs.readFile('random.txt', 'utf8', function(err, data) { 
      // Param 1: filename, param 2: encoding, param 3: callback function

          if (err) { // If something broke
            return console.log(err);
          }
          // the split fcn did not work, getting substrig of the name.
          var fstString = data.substring(0,data.indexOf(","));
          var secString = data.substring(data.indexOf(",") + 1, data.length).replace(/"/g,'');

          // gets the spotify info..
          getSpotify(secString);

         });


    	break ;
    } //end switfh

  }); // end liriInquire



function getSpotify(passSong){
  // runs the spotify query

  var Spotify = require('node-spotify-api');

          // creating spotify variable..
        var spotify    = new Spotify({

            id: keys.spotifyKeys.clientId,
            secret: keys.spotifyKeys.clientSecret

        });

        // getting the data 
        spotify
          .search({ type: 'track', query: passSong, limit: 5})
          .then(function(response) {
            // READING THRU THE JSON RESPONSE DOCUMENT
             for (var index in response.tracks.items){
                 console.log("------------------ " + index + "-------------------")

                 printString ="Song Name: " + response.tracks.items[index].name;
                  console.log(printString);
                  printToLog(printString);

                 printString ="Artist: " + response.tracks.items[index].album.artists[0].name;
                  console.log(printString);
                  printToLog(printString);

                 printString ="Spotify URL: " + response.tracks.items[index].album.artists[0].href;
                  console.log(printString);
                  printToLog(printString);

                 printString ="Album: " + response.tracks.items[index].album.name;
                  console.log(printString);
                  printToLog(printString);



            }
           }) 

          .catch(function(err) {
            console.log(err);
          }); //end spotify.search


}


function printToLog(passString){
  // writes to file
  fs.appendFile("liri_log.txt",passString+"\n");

}