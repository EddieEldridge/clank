// Imports
import { RedisClientInterface } from './redisClient';
let Discord = require("discord.js");
let config = require("../config.json");
let client = new Discord.Client();
let timeTaken = Date.now();


// Variables
const currentGames: string[] = [
  "Apex",
  "Crusader Kings",
  "Warzone",
  "Tabletop Simulator",
  "Tekken",
  "Talisman",
  "Luke decides",
  "Eddie decides",
  "Michael decides",
];
const prefix = "!";

// Login
client.login(config.BOT_TOKEN);

console.log("Powering on...");

// Main Command Definitions
client.on("message", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
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
    case "showgame": {
      RedisClientInterface.init();
      message.reply(RedisClientInterface.showGame());
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

console.log("Clank is online!");

