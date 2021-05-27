// Imports
import * as Discord from 'discord.js';
import authConfig from '../auth.json';

// Classes
import RedisClient from './redis/RedisClient';
import DictionaryClient from './api/DictionaryAPI';
import TheOneAPI from './api/TheOneAPI'
import YugiohAPI from './api/YugiohAPI'
import { convertArrayToString } from './utils/Utils';
import { pickRandomElementFromArray } from './utils/Utils';
import { showHelp } from './utils/Utils';
import { rollDice } from './dice/DiceRoller';

// Classes
import LOTRQuote from './models/lotr/LOTRQuote';
import LOTRCharacter from './models/lotr/LOTRCharacter';
import DefinitionDictAPI from './models/dictionary/DefinitionDictAPI';

// Constructors
const discordclient = new Discord.Client();
const redisClient = new RedisClient();
const lotrClient = new TheOneAPI();
const dictClient = new DictionaryClient();
const yugiohClient = new YugiohAPI();

// Variables
let prefix: string = '>';

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
    const command = args.shift();
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
                ' I added ' + argsContent + ' to the list of games!'
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
                const randomGame: string = pickRandomElementFromArray(listOfGames);
                message.channel.send('I choose **' + randomGame + '** !!!');
            });
            break;
        }

        // Dictionary 
        case 'wotd': {
            const wordOfTheDayDefinition: any = await dictClient.getWordOfTheDay();

            if (wordOfTheDayDefinition.definitions[0]) {
                try {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#344feb')
                        .setTitle(wordOfTheDayDefinition?.word)

                    for (let i = 0; i < wordOfTheDayDefinition.definitions.length; i++) {
                        embed.addFields(
                            { name: 'Source:  ', value: wordOfTheDayDefinition.definitions[0].text ?? 'N/A' },
                            { name: 'Synonyms:  ', value: wordOfTheDayDefinition.definitions[0].source ?? 'N/A' },
                            { name: 'Part of Speech:  ', value: wordOfTheDayDefinition.definitions[0].partOfSpeech ?? 'N/A' },
                            { name: 'Example:  ', value: wordOfTheDayDefinition.examples[0].text ?? 'N/A' },
                        )
                    }
                    message.channel.send(embed);
                } catch (error) {
                    console.log("Error - Word of the Day: " + error);
                }
            } else {
                // message.reply("Todays word is **" + wordOfTheDayDefinition.word + "**. Unfortunately, I couldn't find a definition. Try again tomorrow!");
                break;
            }

            break;
        }

        case 'define': {
            const wordDefinition: DefinitionDictAPI = await dictClient.getWordDefinition(argsContent);

            if (wordDefinition.meanings) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#344feb')
                    .setAuthor(wordDefinition?.word)

                for (let i = 0; i < wordDefinition.meanings.length; i++) {
                    embed.addFields(
                        { name: '============ Definition (' + (i + 1) + ') ============', value: wordDefinition?.meanings[i]?.definitions[0]?.definition || 'N/A' },
                        { name: 'Example:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.example ?? 'N/A' },
                        { name: 'Synonyms:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.synonyms?.[0] ?? 'N/A' },
                        { name: 'Synonyms:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.synonyms?.[1] ?? 'N/A' },
                        { name: 'Synonyms:  ', value: wordDefinition?.meanings[i]?.definitions[0]?.synonyms?.[2] ?? 'N/A' },
                        { name: 'Part of Speech:  ', value: wordDefinition?.meanings[i]?.partOfSpeech ?? 'N/A' },
                    )
                }
                message.channel.send(embed);
                break;
            } else {
                message.reply("sorry. Unfortunately, I couldn't find a definition. Are you sure you spelled it correctly?");
                break;
            }

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
            if (!argsContent) {
                message.reply("specify a character!");
                break;
            }
            const requestedLOTRCharacter: LOTRCharacter = await lotrClient.getCharacterMessage(argsContent);
            if (requestedLOTRCharacter.name) {
                const requestedLOTRCharacterMessage: string =
                    "**Name: **" +
                    requestedLOTRCharacter.name +
                    "\n" +
                    "**Race: **" +
                    requestedLOTRCharacter.race +
                    "\n" +
                    "**Gender: **" +
                    requestedLOTRCharacter.gender +
                    "\n" +
                    "**Birth: **" +
                    requestedLOTRCharacter.birth +
                    "\n" +
                    "**Spouse: **" +
                    requestedLOTRCharacter.spouse +
                    "\n" +
                    "**Death: **" +
                    requestedLOTRCharacter.death +
                    "\n" +
                    "**Realm: **" +
                    requestedLOTRCharacter.realm +
                    "\n" +
                    "**Hair: **" +
                    requestedLOTRCharacter.hair +
                    "\n" +
                    "**Height: **" +
                    requestedLOTRCharacter.height +
                    "\n" +
                    "**Wiki: **" +
                    requestedLOTRCharacter.wikiUrl +
                    "\n";

                message.channel.send(requestedLOTRCharacterMessage);
                break;
            }
            else {
                message.reply("sorry. I couldn't find that character. Are you sure you spelled their name correctly?")
                break;
            }

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

        // Tekken
        case 'startTournament': {
            message.reply(
                "What kind of tournament do you want to play?"
            ); break;
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
        case 'prefix': {
            if (!argsContent) {
                message.reply("specify a prefix!");
                break;
            }
            prefix = argsContent;
            message.reply("now I'll use the prefix " + argsContent + " instead of the default '>'.");
            break;
        }
        case 'yugioh': {
            const yugiohCard: any = await yugiohClient.getRandomCard();
            console.log(yugiohCard);
            

            message.channel.send(yugiohCard.card_images[0].image_url);
            message.channel.send("**Price:** " + yugiohCard.card_prices[0].amazon_price);
            break;
        }
        default: {
            message.reply(
                "I'm sorry but I have no idea what you are talking about! Try using >help"
            );
            break;
        }
        
    }
});

console.log();
