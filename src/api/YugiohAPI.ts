import HTTPClient from "../utils/HttpClient";
const httpClient = new HTTPClient("https://db.ygoprodeck.com/api/v7", "");

export default class YugiohAPI {
  async getRandomCard(): Promise<any> {
    try {
      const randomCard = await httpClient.GET(
        "/randomcard.php"
      );
      
      return randomCard;
    } catch (error) {
      console.log("Error - getRandomCard: " + error.message);
      return error.message;
    }
  }
}
