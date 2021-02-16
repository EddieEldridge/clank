import HTTPClient from "../utils/HttpClient";
import authInfo from "../../auth.json";
import * as Discord from "discord.js";

const TOKEN = authInfo.LOTR_API_TOKEN;
const httpClient = new HTTPClient("https://the-one-api.dev/v2", TOKEN);

export default class TheOneAPI {
  async listCharacters(): Promise<string> {
    try {
      const response = await httpClient.GET("/character");
      console.log("Response: " + response);
      return response;
    } catch (error) {
      console.log("Failure: " + error.message);
      return error.message;
    }
  }

  // async getCharacter(name: string): Promise<Discord.MessageEmbed> {
  //     try {
  //         const characterData = await httpClient.GET("/character?name=" + name);
  //         const characterString = JSON.stringify(characterData);
  //         const lotrCharacter = JSON.parse(characterString);

  //         let charName: string;
  //         let wikiUrl = "Unknown";
  //         let height = "Unknown";
  //         let race = "Unknown";
  //         let gender = "Unknown";
  //         let birth = "Unknown";
  //         let spouse = "Unknown";
  //         let death = "Unknown";
  //         let realm = "Unknown";
  //         let hair = "Unknown";

  //         if (lotrCharacter.docs[0].charName) {
  //             charName = lotrCharacter.docs[0].name;
  //         }

  //         if (lotrCharacter.docs[0].wikiUrl) {
  //             wikiUrl = lotrCharacter.docs[0].wikiUrl;
  //         }

  //         if (lotrCharacter.docs[0].height) {
  //             height = lotrCharacter.docs[0].height;
  //         }

  //         if (lotrCharacter.docs[0].race) {
  //             race = lotrCharacter.docs[0].race;
  //         }

  //         if (lotrCharacter.docs[0].gender) {
  //             gender = lotrCharacter.docs[0].gender;
  //         }

  //         if (lotrCharacter.docs[0].birth) {
  //             birth = lotrCharacter.docs[0].birth;
  //         }

  //         const embed = new Discord.MessageEmbed()
  //             .setColor('#FF0000')
  //             .setTitle(lotrCharacter.docs[0].name)
  //             .setURL(wikiUrl)
  //             .setAuthor('The One API', 'https://static.wikia.nocookie.net/warner-bros-entertainment/images/6/6e/One_Ring.png/revision/latest?cb=20171108203646', 'https://the-one-api.dev/')
  //             .addFields(
  //                 { name: 'Height', value: height },
  //                 { name: 'Race', value: race },
  //                 { name: 'Gender', value: gender },
  //                 { name: 'Birth', value: birth },
  //             )
  //         return embed;
  //     } catch (error) {
  //         console.log("Error - getCharacter: " + error.message);
  //         return error.message
  //     }

  // }

  async getCharacterMessage(name: string): Promise<string> {
    try {
      const characterData = await httpClient.GET(
        "/character?name=/" + name + "/i"
      );
      const characterString = JSON.stringify(characterData);
      const lotrCharacter = JSON.parse(characterString);

      const message: string =
        "**Name: **" +
        lotrCharacter.docs[0].name +
        "\n" +
        "**Race: **" +
        lotrCharacter.docs[0].race +
        "\n" +
        "**Gender: **" +
        lotrCharacter.docs[0].gender +
        "\n" +
        "**Birth: **" +
        lotrCharacter.docs[0].birth +
        "\n" +
        "**Spouse: **" +
        lotrCharacter.docs[0].spouse +
        "\n" +
        "**Death: **" +
        lotrCharacter.docs[0].death +
        "\n" +
        "**Realm: **" +
        lotrCharacter.docs[0].realm +
        "\n" +
        "**Hair: **" +
        lotrCharacter.docs[0].hair +
        "\n" +
        "**Height: **" +
        lotrCharacter.docs[0].height +
        "\n" +
        "**Wiki: **" +
        lotrCharacter.docs[0].wikiUrl +
        "\n";

      return message;
    } catch (error) {
      console.log("Error - getCharacter: " + error.message);
      return error.message;
    }
  }

  async getRandomQuote(name: string): Promise<string> {
    let id: number;
    id = Math.floor(Math.random() * 1000);
    try {
      const quotes: string = await httpClient.GET("/quote");
      const quotesString = JSON.stringify(quotes);
      const qouteJSON = JSON.parse(quotesString);

      const characterData = await httpClient.GET(
        "/character/" + qouteJSON.docs[id].character
      );
      const characterString = JSON.stringify(characterData);
      const lotrCharacter = JSON.parse(characterString);

      const movieData = await httpClient.GET(
        "/movie/" + qouteJSON.docs[id].movie
      );
      const movieString = JSON.stringify(movieData);
      const movie = JSON.parse(movieString);
      console.log(movie);
      
    
      const message: string =
        "**Dialog: **" +
        qouteJSON.docs[id].dialog +
        "\n" +
        "**Character: **" +
        lotrCharacter.docs[0].name +
        "\n" +
        "**Movie: **" +
        movie.docs[0].name;

      return message;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}
