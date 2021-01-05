import axios from 'axios';

export default class DictionaryClient {
    async getWordOfTheDay(): Promise<Array<string>> {
        axios
            .get('https://dictionary.cambridge.org/api/v1/dictionaries')
            .then((response) => {
                console.log(response);
                return response;
            });

        return;
    }
}
