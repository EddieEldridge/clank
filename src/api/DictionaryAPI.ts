import authInfo from '../../auth.json'
import HTTPClient from '../utils/HttpClient';
import DefinitionDictAPI from '../models/dictionary/DefinitionDictAPI';

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
                console.log("Response: " + response);

                const wordOfTheDay = response?.word;       
                
                try {
                    const definition: DefinitionDictAPI = await this.getWordDefinition(wordOfTheDay);
                    return definition;
                } catch (error) {
                    console.log("Error - getWordOfTheDay(Definition): " + error.message);  
                }

            } catch (error) {
                console.log("Failure: " + error.message);
                return error.message
            }

        return;
    }

    async getWordDefinition(query: string): Promise<DefinitionDictAPI>{
        try {
            const response = await httpClientGoogleDict.GET("/entries/en/" + query);
            const definition: DefinitionDictAPI = new DefinitionDictAPI(
                response[0].meanings,
                response[0].phoentics,
                response[0].word
            );
            
            return definition
        
        } catch (error) {
            console.log("Failure: " + error.message);
            return error.message
        }
    }

     
}
