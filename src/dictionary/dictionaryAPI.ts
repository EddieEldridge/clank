import axios, { AxiosInstance } from 'axios';

export default class DictionaryClient {
    
    constructor() {
    }

    async  getWordOfTheDay(): Promise<Array<string>> {
    axios.get("https://dictionary.cambridge.org/api/v1/dictionaries").then(response => {
        console.log(response)
        return response;
    })

    return;
}
}