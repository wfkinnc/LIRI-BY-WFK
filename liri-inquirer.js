// Load the NPM Package inquirer
var liri-inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "What do you want LIRI to do?",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "LIRI"
    },
  
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    // if (inquirerResponse.confirm) {
    //   console.log("\nWelcome " + inquirerResponse.username);
    //   console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
    // }
    // else {
    //   console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    // }
    console.log(inquirerResponse.name)
  });
