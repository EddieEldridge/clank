import { Configuration, OpenAIApi } from 'openai';
import authInfo from '../../auth.json';
import { printResponse } from '../utils/utils';

const openAIConfig = new Configuration({
    apiKey: authInfo.OPENAI_API_KEY
});

const openai = new OpenAIApi(openAIConfig);

export default class OpenAPI {
    async getCompletion(thingToComplete: string): Promise<any> {

        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: thingToComplete,
            max_tokens: 300
        });

        const predicition = completion?.data?.choices[0].text

        return predicition;
    }
}
