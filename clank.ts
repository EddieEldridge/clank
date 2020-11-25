let Discord = require("discord.js");
let config = require("./config.json");
let client = new Discord.Client();
let timeTaken = Date.now();

const currentGames: string[] = ['Apex', 'Crusader Kings', 'Warzone', 'Tabletop Simulator', 'Talisman', 'Luke decides!', 'Eddie decides!', 'Michael decides!'];  

console.log("Powering on...");
console.log(chooseRandomGame());

const prefix = "!";

client.on("message", function(message) { 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
  
    if (command === "check") {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Hello Eddie! It took ${timeTaken}ms before I received your command.`);
    }
  
    else if (command === "game") {
      console.log(chooseRandomGame);
      message.reply(chooseRandomGame());
    }

    message.reply(`Farewell, I shall return!`);

});


function chooseRandomGame(): string {
    let numCurrentGame: number = currentGames.length;
    let randomNumber: number =  Math.random() * (numCurrentGame - 0) + 0;
    let game: string = currentGames[Math.round(randomNumber)];
    console.log(randomNumber)
    return game;
}

client.login(config.BOT_TOKEN);
