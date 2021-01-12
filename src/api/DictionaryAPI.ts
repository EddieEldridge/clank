import axios from 'axios';
import authInfo from '../../auth.json'
import HTTPClient from '../utils/HttpClient';
import * as Discord from 'discord.js';

class IResponse{
    word: string;
    definitions: string[];
}

const TOKEN = authInfo.WORDNIK_API_TOKEN;

const httpClient = new HTTPClient(
    'http://api.wordnik.com/v4',
    "");

export default class DictionaryClient {
    async getWordOfTheDay(): Promise<Discord.MessageEmbed> {
            try {
                const response = await httpClient.GET("/words.json/wordOfTheDay?api_key=" + TOKEN);
                console.log("Response: " + response);
                
                const title: string = response.word;
                const definition1: string = response.definitions[0].text;
                const definition2: string = response.definitions[1].text;
                const definition3: string = response.definitions[2].text;
                
                const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle("Word: " + title)
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

     
}
