// Imports
import * as Discord from 'discord.js';
import authConfig from '../auth.json';

// Classes
import RedisClient from './redis/redisClient';
import DictionaryClient from './api/DictionaryAPI';
import TheOneAPI from './api/TheOneAPI'
import YugiohAPI from './api/YugiohAPI'
import PokemonAPI from './api/PokemonAPI'
import HistoryAPI from './api/HistoryAPI'
import OpenAPI from './api/OpenAPI'
import { capitalize, convertArrayToString } from './utils/utils';
import { pickRandomElementFromArray, showHelp } from './utils/utils';
import { rollDice } from './dice/diceRoller';

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
const pokemonClient = new PokemonAPI();
const historyClient = new HistoryAPI();
const openAPIClient = new OpenAPI();

// Variables
let prefix: string = '!';

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
                        .setTitle(wordOfTheDayDefinition.word)

                    for (let i = 0; i < wordOfTheDayDefinition.definitions.length; i++) {
                        embed.addFields(
                            { name: 'Definition ' + (i + 1) + ':  ', value: wordOfTheDayDefinition.definitions[i].text ?? 'N/A' },
                            { name: 'Part of Speech ' + (i + 1) + ':  ', value: wordOfTheDayDefinition.definitions[i].partOfSpeech ?? 'N/A' }
                        )
                        if (i == 2) {
                            break;
                        }
                    }

                    for (let i = 0; i < wordOfTheDayDefinition.definitions.length; i++) {
                        embed.addFields(
                            { name: 'Example ' + (i + 1) + ':  ', value: wordOfTheDayDefinition.examples[i].text ?? 'N/A' }
                        );
                        if (i == 2) {
                            break;
                        }
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

        // History Fact
        case 'hotd': {
            const historyOfTheDay: any = await historyClient.getHistoryOfTheDay();
            console.log('\n💡 ---------------------------------------');
            console.log('\n💡 | historyOfTheDay', historyOfTheDay);
            console.log('\n💡 ---------------------------------------');


            if (historyOfTheDay) {
                const currentDate: string = historyOfTheDay?.date;
                const events: any[] = historyOfTheDay?.data?.Events;
                // const Births: any[] = historyOfTheDay?.data?.Births;
                // const Deaths: any[] = historyOfTheDay?.data?.Deaths;
                const eventsLength: number = historyOfTheDay?.data?.Events?.length;

                const randomEventNum: number = Math.floor(Math.random() * eventsLength)
                const randomEvent = events[randomEventNum];
                console.log('\n💡 -------------------------------');
                console.log('\n💡 | randomEvent', randomEvent);
                console.log('\n💡 -------------------------------');

                const embed = new Discord.MessageEmbed()
                    .setColor('#d39104')
                    .setTitle(currentDate)
                embed.addFields(
                    { name: 'Year', value: randomEvent.year },
                    { name: 'Event', value: randomEvent.text }
                )

                try {
                    message.channel.send(embed);
                } catch (error) {
                    console.log("Error - History of the Day: " + error);
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
            message.channel.send("**Price ($):** " + yugiohCard.card_prices[0].cardmarket_price);
            break;
        }
        case 'yugiohs': {
            if (!argsContent) {
                message.reply("Please specify a card name!");
                break;
            }
            const yugiohCards: any = await yugiohClient.getCard(encodeURIComponent(argsContent));

            console.log('\n ========================');
            console.log(yugiohCards);
            console.log('\n ========================');

            if (yugiohCards?.message) {
                message.channel.send(yugiohCards?.message)

                if (!yugiohCards?.data) {
                    break;
                }
            }

            message.channel.send(`${yugiohCards?.data?.card_images[0].image_url}`);
            message.channel.send(`**Price ($):** ${yugiohCards?.data?.card_prices[0]?.cardmarket_price}\n**Release Date:** ${yugiohCards?.data?.misc_info[0]?.tcg_date}`)
            break;
        }
        case 'pokemon': {
            const randomPokemon: any = await pokemonClient.getRandomPokemon();
            const randomNumber: number = Math.floor(Math.random() * 100)

            message.channel.send("\n**A wild " + capitalize(randomPokemon.name) + " has appeared!**");


            message.channel.send(randomPokemon.sprites.other['official-artwork'].front_default);
            message.channel.send("\n**Name:** " + capitalize(randomPokemon.name));
            message.channel.send("\n**Level:** " + randomNumber);

            for (const pokemonType in randomPokemon.types) {
                message.channel.send("**Type:** " + capitalize(randomPokemon.types[pokemonType].type.name));
            }

            if (randomNumber == 69) {
                message.reply("**Unbelievable! This one is shiny!**")
                message.channel.send(randomPokemon.sprites.front_shiny);
            }


            break;
        }
        case 'pokemove': {
            const randomPokemove: any = await pokemonClient.getRandomPokemove();
            let count: number = 0;

            message.channel.send("\n**Name** \n" + capitalize(randomPokemove.name));
            message.channel.send("\n**Type** \n" + capitalize(randomPokemove.type.name));

            for (let i = 0; i < randomPokemove.flavor_text_entries.length; i++) {
                const flavourTextEntry: any = randomPokemove.flavor_text_entries[i];

                if (count >= 1) {
                    break;
                }

                if (flavourTextEntry?.language?.name === 'en') {
                    message.channel.send("**Description** \n" + flavourTextEntry.flavor_text);
                    count = count + 1;
                }
            }

        }
        case 'ai': {
            if (!argsContent) {
                message.reply("Please ask me something!");
                break;
            }

            const sentMessage = await message.channel.send("Hmmmmm.. let me think....");
            console.log(sentMessage);

            const completion: any = await openAPIClient.getCompletion(argsContent);

            sentMessage.edit(completion)
        }
            break;
        default: {
            message.reply(
                "I'm sorry but I have no idea what you are talking about! Try using >help"
            );
            break;
        }

    }
});