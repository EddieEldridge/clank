// Imports
let Discord = require("discord.js");
let config = require("../config.json");

// Classes
import RedisClient from "./redis/redisClient";
import DictionaryClient from "./dictionary/dictionaryAPI";
import { convertArrayToString } from "./utils/utils";
import { pickRandomElement } from "./utils/utils";
import { showHelp } from "./utils/utils";
import { rollDice } from "./dice/diceRoller";
import { exit } from "process";

// Constructors
let discordclient = new Discord.Client();
let timeTaken = Date.now();
let redisClient = new RedisClient();
let dictClient = new DictionaryClient();

// Variables
const prefix = "!";

// Login
discordclient.login(config.BOT_TOKEN);

console.log();
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
  const argsContent = convertArrayToString(args, ",", true);

  switch (command) {
    case "addgame": {
      if (!args.length) {
        return message.channel.send(`You didn't specify a game, ${message.author}!`);
      }
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
    case "wotd":{
      message.channel.send(dictClient.getWordOfTheDay());
    }
    case "roll":{
      let diceRoll: string = rollDice(argsContent);
      if(diceRoll){
        message.channel.send(diceRoll);
      }else{
        message.channel.send("The format was incorrect. Examples include 1d6, 2d10, 5d8+2, 3d8+1");
      }
      break;
    }
    case "help":{
      message.channel.send(showHelp());
    }
    case "shutdown":{
      message.reply("Farewell, I shall return!");
      process.exit(0);
      break;
    }
    default: {
      message.reply("I'm sorry but I have no idea what you are talking about!");
      break;
    }
  }
});

console.log();

