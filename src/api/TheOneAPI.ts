import HTTPClient from "../utils/HttpClient";
import authInfo from "../../auth.json";
import LOTRQuote from "../models/lotr/LOTRQuote"
import LOTRCharacter from "../models/lotr/LOTRCharacter"

const TOKEN = authInfo.LOTR_API_TOKEN;
const httpClient = new HTTPClient("https://the-one-api.dev/v2", TOKEN);

export default class TheOneAPI {
  async getCharacterMessage(name: string): Promise<LOTRCharacter> {
    try {
      const characterData = await httpClient.GET(
        "/character?name=/" + name + "/i"
      );
      const characterString = JSON.stringify(characterData);
      const lotrCharacterJSON = JSON.parse(characterString);
      const lotrCharacter: LOTRCharacter = new LOTRCharacter(
        lotrCharacterJSON.docs[0].name,
        lotrCharacterJSON.docs[0].height,     
        lotrCharacterJSON.docs[0].Race,     
        lotrCharacterJSON.docs[0].gender,     
        lotrCharacterJSON.docs[0].birth,     
        lotrCharacterJSON.docs[0].spouse,     
        lotrCharacterJSON.docs[0].death,     
        lotrCharacterJSON.docs[0].realm,     
        lotrCharacterJSON.docs[0].hair,     
        lotrCharacterJSON.docs[0].wikiUrl
      )
      return lotrCharacter;
    } catch (error) {
      console.log("Error - getCharacter: " + error.message);
      return error.message;
    }
  }

  async getRandomQuote(): Promise<LOTRQuote> {
    const id: number = Math.floor(Math.random() * 1000)

    const randomLOTRQuote = new LOTRQuote();

    try {
      // Get the quote
      const quotes: any = await httpClient.GET("/quote");
      randomLOTRQuote.text = quotes.docs[id].dialog;

      // Using the ID from the random quote, get the corresponding character
      const characterData = await httpClient.GET(
        "/character/" + quotes.docs[id].character
      );
      randomLOTRQuote.character = characterData.docs[0].name;

      // Using the ID from the quote, get the corresponding movie
      const movieData = await httpClient.GET(
        "/movie/" + quotes.docs[id].movie
      );
      randomLOTRQuote.movie = movieData.docs[0].name;

      return randomLOTRQuote;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

}
