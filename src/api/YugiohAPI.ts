import { Message } from "discord.js";
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
      let message;
      let i = 0;
      let cardResults = await httpClient.GET(
        `/cardinfo.php?name=${cardName}&misc=yes`
      );

      if(!cardResults){
           message = 'I couldn\'t find that exact card. Perhaps you meant one of these?'
           console.log(cardName);

           const fuzzyCardResults = await httpClient.GET(`/cardinfo.php?fname=${cardName}&misc=yes`);

          for(i=0; i<fuzzyCardResults?.data.length; i++){
            const cardName = fuzzyCardResults?.data?.[i]?.name;
            message = message.concat(`\n • ${cardName}`);
            console.log('\n ========================');
            console.log(fuzzyCardResults.data?.[i]?.name);
            console.log('\n ========================');

            if(i==5){
              message = message.concat('\n Many more cards were found but to save Medik money, please refer to Google!')
              cardResults = undefined;
              break;
            }
          }

          if(!fuzzyCardResults){
            message = 'Sorry, that card was not found at all.'
            cardResults = undefined;
          }
      }

      console.log('\n ========================');
      console.log(message);
      console.log('\n ========================');

      return {
        message: message,
        data: cardResults?.data[0]
      }
    } catch (error) {
      console.log("Error - getCard: " + error.message);
      return error.message;
    }
  }
}
