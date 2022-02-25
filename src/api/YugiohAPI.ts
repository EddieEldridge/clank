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

  async getCard(cardName: string): Promise<any> {
    try {
      const cardResults = await httpClient.GET(
        `/cardinfo.php?fname=${cardName}&misc=yes`
      );

      if(!cardResults){
        return undefined;
      }

      console.log('\n ========================');
      console.log(cardResults.data[0].misc_info);
      console.log('\n ========================');

      return cardResults.data[0];
    } catch (error) {
      console.log("Error - getRandomCard: " + error.message);
      return error.message;
    }
  }
}
