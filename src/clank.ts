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

// Classes
import LOTRQuote from './models/lotr/LOTRQuote';
import LOTRCharacter from './models/lotr/LOTRCharacter';
import DefinitionDictAPI from './models/dictionary/DictionaryAPI/DefinitionDictAPI';

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
    console.log(args);
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
            const wordOfTheDayDefinition: DefinitionDictAPI = await dictClient.getWordOfTheDay();

            try {
                const embed = new Discord.MessageEmbed()
                .setColor('#344feb')
                .setAuthor(wordOfTheDayDefinition?.word)

                for(let i=0; i<wordOfTheDayDefinition.meanings.length; i++){
                    embed.addFields(
                    { name: '============ Definition ('+(i+1)+') ============' , value: wordOfTheDayDefinition?.meanings[i]?.definitions[0]?.definition || 'N/A' },
                    { name: 'Example:  ', value: wordOfTheDayDefinition?.meanings[i]?.definitions[0]?.example ?? 'N/A' },
                    { name: 'Synonyms:  ', value: wordOfTheDayDefinition?.meanings[i]?.definitions[0]?.synonyms?.[0] ?? 'N/A'},
                    { name: 'Synonyms:  ', value: wordOfTheDayDefinition?.meanings[i]?.definitions[0]?.synonyms?.[1] ?? 'N/A' },
                    { name: 'Synonyms:  ', value: wordOfTheDayDefinition?.meanings[i]?.definitions[0]?.synonyms?.[2] ?? 'N/A' },
                    { name: 'Part of Speech:  ', value: wordOfTheDayDefinition?.meanings[i]?.partOfSpeech ?? 'N/A' },
                    )
                }
                message.channel.send(embed);  
            } catch (error) {
                console.log("Error - Word of the Day: " + error);
            }
            break;
        }

        case 'define': {
            const wordDefinition: DefinitionDictAPI = await dictClient.getWordDefinition(argsContent);
            const embed = new Discord.MessageEmbed()
                .setColor('#344feb')
                .setAuthor(wordDefinition?.word)

                for(let i=0; i<wordDefinition.meanings.length; i++){
                    embed.addFields(
                    { name: '============ Definition ('+(i+1)+') ============' , value: wordDefinition?.meanings[i]?.definitions[0]?.definition || 'N/A' },
                    { name: 'Example:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.example ?? 'N/A' },
                    { name: 'Synonyms:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.synonyms?.[0] ?? 'N/A'},
                    { name: 'Synonyms:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.synonyms?.[1] ?? 'N/A' },
                    { name: 'Synonyms:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.synonyms?.[2] ?? 'N/A' },
                    { name: 'Part of Speech:  ', value: wordDefinition?.meanings[i]?.partOfSpeech ?? 'N/A' },
                    )
                }
                message.channel.send(embed);                        
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
        case 'lotrgc': {
            if(!argsContent){
                message.reply("specify a character!");
                break;
            }
            const randomLOTRCharacter: LOTRCharacter = await lotrClient.getCharacterMessage(argsContent);
            const randomLOTRCharacterMessage: string =
                "**Name: **" +
                randomLOTRCharacter.name +
                "\n" +
                "**Race: **" +
                randomLOTRCharacter.race +
                "\n" +
                "**Gender: **" +
                randomLOTRCharacter.gender +
                "\n" +
                "**Birth: **" +
                randomLOTRCharacter.birth +
                "\n" +
                "**Spouse: **" +
                randomLOTRCharacter.spouse +
                "\n" +
                "**Death: **" +
                randomLOTRCharacter.death +
                "\n" +
                "**Realm: **" +
                randomLOTRCharacter.realm +
                "\n" +
                "**Hair: **" +
                randomLOTRCharacter.hair +
                "\n" +
                "**Height: **" +
                randomLOTRCharacter.height +
                "\n" +
                "**Wiki: **" +
                randomLOTRCharacter.wikiUrl +
                "\n";
                
            message.channel.send(randomLOTRCharacterMessage);
            break;
        }
        case 'lotrq': {
            const randomLOTRQuote: LOTRQuote = await lotrClient.getRandomQuote();

            const randomLOTRQuoteMessage: string =
            "**Quote: **" +
            randomLOTRQuote.text +
            "\n" +
            "**Character: **" +
            randomLOTRQuote.character +
            "\n" +
            "**Movie: **" +
            randomLOTRQuote.movie;

            message.channel.send(randomLOTRQuoteMessage);
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
