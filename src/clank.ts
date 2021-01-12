// Imports
import * as Discord from 'discord.js';
import authConfig from '../auth.json';

// Classes
import RedisClient from './redis/RedisClient';
import DictionaryClient from './api/dictionaryAPI';
import TheOneAPI from './api/TheOneAPI'
import { convertArrayToString } from './utils/Utils';
import { pickRandomElement } from './utils/Utils';
import { showHelp } from './utils/Utils';
import { rollDice } from './dice/DiceRoller';

// Constructors
const discordclient = new Discord.Client();
const redisClient = new RedisClient();
const lotrClient = new TheOneAPI();
const dictClient = new DictionaryClient();

// Variables
const prefix = '!';

// Login
discordclient.login(authConfig.DISCORD_BOT_TOKEN);

console.log();
console.log('Powering on...');
console.log('Clank is online!');
console.log('=== DEBUG === \n');

// Main Command Definitions
discordclient.on('message', async (message) => {
    // Exit if the message isn't addressed to the bot
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Split the message up by spaces to extract our arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const argsContent = convertArrayToString(args, ',', true);

    console.log("\nMessage Recieved: " + message.content);
    

    switch (command) {

        // Redis
        case 'addgame': {
            if (!args.length) {
                return message.channel.send(
                    `You didn't specify a game, ${message.author}!`
                );
            }
            message.reply(
                'Alright, I added ' + argsContent + ' to the list of games!'
            );

            redisClient.addGame(argsContent);
            break;
        }
        case 'listgames': {
            message.channel.send(
                'The following games I pick from are as follows: '
            );
            redisClient.listGames().then((redisPromise) => {
                console.log(redisPromise);
                message.channel.send(redisPromise);
            });
            break;
        }
        case 'removegame': {
            message.channel.send(
                'Attempting to remove ' +
                    argsContent +
                    ' from the list of games...'
            );
            redisClient.removeGame(argsContent).then((redisPromise) => {
                // console.log("Result: " + redisPromise.toString());
                if (redisPromise.toString() === '0') {
                    message.channel.send('Game was not found.');
                }
                message.channel.send(
                    'Removed ' + argsContent + ' from the list!'
                );
            });
            break;
        }
        case 'choosegame': {
            message.channel.send('Picking a random game to play...');
            redisClient.listGames().then((listOfGames) => {
                const randomGame: string = pickRandomElement(listOfGames);
                message.channel.send('I choose **' + randomGame + '** !!!');
            });
            break;
        }

       // Dictionary 
        case 'wotd': {
            const wotdEmbed = await dictClient.getWordOfTheDay();
            message.channel.send(wotdEmbed);
            break;
        }

        // Dice Roller
        case 'roll': {
            const diceRoll: string = rollDice(argsContent);
            if (diceRoll) {
                message.channel.send(diceRoll);
            } else {
                message.channel.send(
                    'The format was incorrect. Examples include 1d6, 2d10, 5d8+2, 3d8+1'
                );
            }
            break;
        }

        // LOTR
        case 'lotrcs': {
            message.channel.send(lotrClient.listCharacters());
            break;
        }
        case 'lotrgc': {
            const characterEmbed = await lotrClient.getCharacter(argsContent);
            message.channel.send(characterEmbed);
            break;
        }

        // Utils
        case 'help': {
            message.channel.send(showHelp());
            break;
        }
        case 'shutdown': {
            message.reply('Farewell, I shall return!');
            process.exit(0);
            break;
        }
        default: {
            message.reply(
                "I'm sorry but I have no idea what you are talking about!"
            );
            break;
        }
    }
});

console.log();
