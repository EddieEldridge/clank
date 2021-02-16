import axios from 'axios';
import authInfo from '../../auth.json'
import HTTPClient from '../utils/HttpClient';
import * as Discord from 'discord.js';

class Response{
    word: string;
    definitions: string[];
}

const TOKEN = authInfo.WORDNIK_API_TOKEN;

const httpClientWordnik = new HTTPClient(
    'http://api.wordnik.com/v4',
    "");

const httpClientGoogleDict = new HTTPClient(
    'https://api.dictionaryapi.dev/api/v2',
    "");
    

export default class DictionaryClient {
    async getWordOfTheDay(): Promise<Discord.MessageEmbed> {
            try {
                const response = await httpClientWordnik.GET("/words.json/wordOfTheDay?api_key=" + TOKEN);
                console.log("Response: " + response);

                const title: string = response.word;
                const definition1: string = response.definitions[0].text ?? "N/A";
                const definition2: string = response.definitions[1].text ?? "N/A";
                const definition3: string = response.definitions[2].text ?? "N/A";
                
                const embed = new Discord.MessageEmbed()
                .setColor('#344feb')
                .setTitle(title)
                .setAuthor('Wordnik', 'https://icons.iconarchive.com/icons/dtafalonso/ios7-desktop/256/Dictionary-icon.png', 'https://developer.wordnik.com/')
                .addFields(
                    { name: 'Definition 1: ', value: definition1 },
                    { name: 'Definition 2: ', value: definition2 },
                    { name: 'Definition 3: ', value: definition3 },
                )

                return embed;
            } catch (error) {
                console.log("Failure: " + error.message);
                return error.message
            }

        return;
    }

    async getWordDefinition(query: string): Promise<string>{
        try {
            const response = await httpClientGoogleDict.GET("/entries/en/" + query);
            console.log("Definition: " + response[0].word);

            return response[0].word
        
        } catch (error) {
            console.log("Failure: " + error.message);
            return error.message
        }
    }

     
}
