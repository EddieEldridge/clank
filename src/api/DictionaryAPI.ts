import authInfo from '../../auth.json'
import HTTPClient from '../utils/HttpClient';
import DefinitionDictAPI from '../models/dictionary/definitionDictAPI';

const TOKEN = authInfo.WORDNIK_API_TOKEN;

const httpClientWordnik = new HTTPClient(
    'http://api.wordnik.com/v4',
    "");

const httpClientGoogleDict = new HTTPClient(
    'https://api.dictionaryapi.dev/api/v2',
    "");
    

export default class DictionaryClient {
    async getWordOfTheDay(): Promise<DefinitionDictAPI> {
            try {
                const response: any = await httpClientWordnik.GET("/words.json/wordOfTheDay?api_key=" + TOKEN);
                
                try {                    
                    return response;
                } catch (error) {
                    console.log("Error - getWordOfTheDay(Definition): " + error.message);  
                }
            } catch (error) {
                console.log("Error - getWordOfTheDay: " + error.message);
                return error.message
            }

        return;
    }

    async getWordDefinition(word: string): Promise<DefinitionDictAPI> {
        try {
            const response: any = await httpClientGoogleDict.GET("/entries/en/" + word);
            if (response) {
                const definition: DefinitionDictAPI = new DefinitionDictAPI(
                    response[0].meanings,
                    response[0].phoentics,
                    response[0].word
                );
                return definition
            } else {
                const definition: DefinitionDictAPI = new DefinitionDictAPI(
                    undefined,
                    undefined,
                    word
                );
                return definition;
            }
        } catch (error) {
            console.log("Error - getWordDefinition: " + error.message);
            return error.message
        }
    }

     
}
