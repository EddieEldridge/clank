// Imports
let Discord = require("discord.js");
let config = require("../config.json");

// Classes
import RedisClient from "./redis/redisClient";
import { convertArrayToString } from "./utils/utils";
import { pickRandomElement } from "./utils/utils";

// Constructors
let discordclient = new Discord.Client();
let timeTaken = Date.now();
let redisClient = new RedisClient();

// Variables
const currentGames: string[] = [
  "Apex",
  "Crusader Kings",
  "Warzone",
  "Tabletop Simulator",
  "Tekken",
  "Talisman",

];
const prefix = "!";

// Login
discordclient.login(config.BOT_TOKEN);

console.log("Powering on...");
console.log("Clank is online!");
console.log("=== DEBUG === \n \n \n");


// Main Command Definitions
discordclient.on("message", message => {

  // Exit if the message isn't addressed to the bot
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // Split the message up by spaces to extract our arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "game": {
      message.reply("Hmmmm... you should play... **" + chooseRandomGame() + "!**");
      break;
    }
    case "shutdown": {
      message.reply("Farewell, I shall return!");
      break;
    }
    case "addgame": {
      if (!args.length) {
        return message.channel.send(`You didn't specify a game, ${message.author}!`);
      }
      let argsContent = convertArrayToString(args, ",", true);
      message.reply("Alright, I added " + argsContent + " to the list of games!");

      redisClient.addGame(argsContent);
      break;
    }
    case "listgames": {
      message.channel.send("The following games I pick from are as follows: ")
      redisClient.listGames().then(redisPromise => {
        console.log(redisPromise)
        message.channel.send(redisPromise);
      });
      break;
    }
    case "removegame":{
      let argsContent = convertArrayToString(args, ",", true);
      message.channel.send("Attempting to remove " + argsContent + " from the list of games...")
      redisClient.removeGame(argsContent).then(redisPromise => {
        // console.log("Result: " + redisPromise.toString());
        if(redisPromise.toString()==="0"){
          message.channel.send("Game was not found.")
        }
        message.channel.send("Removed " + argsContent + " from the list!")
      })
      break;
    }
    case "choosegame":{
      message.channel.send("Picking a random game to play...")
      redisClient.listGames().then(listOfGames => {
        let randomGame: string = pickRandomElement(listOfGames);
        message.channel.send("I choose **" + randomGame + "** !!!");
      });
      break;
    }
    default: {
      message.reply("I'm sorry but I have no idea what you are talking about!");
      break;
    }
  }
});

// Functions
function chooseRandomGame(): string {
  let numCurrentGame: number = currentGames.length;
  let randomNumber: number = Math.random() * (numCurrentGame - 0) + 0;
  let game: string = currentGames[Math.round(randomNumber)];
  return game;
}

console.log();
console.log();
console.log();



