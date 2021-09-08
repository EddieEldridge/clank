import authInfo from '../../auth.json'
import HTTPClient from '../utils/HttpClient';

const TOKEN = authInfo.WORDNIK_API_TOKEN;

const httpClientMuffinLabs= new HTTPClient(
    'http://history.muffinlabs.com',
    "");

export default class HistoryAPI {
    async getHistoryOfTheDay(): Promise<any> {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();

            try {
                const response: any = await httpClientMuffinLabs.GET(`/date/${currentMonth+1}/${currentDay}`);

                try {
                    return response;
                } catch (error) {
                    console.log("Error - getHistoryOfTheDay(Definition): " + error.message);
                }
            } catch (error) {
                console.log("Error - getHistoryOfTheDay: " + error.message);
                return error.message
            }

        return;
        }
}
