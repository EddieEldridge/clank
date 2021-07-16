import HTTPClient from "../utils/HttpClient";
const httpClient = new HTTPClient("https://pokeapi.co/api/v2", "");

export default class PokemonAPI {
  async getRandomPokemon(): Promise<any> {
    try {

      const randomID: number = Math.floor(Math.random() * 898)

      const randomPokemon = await httpClient.GET(
        "/pokemon/" + randomID
      );

      return randomPokemon;
    } catch (error) {
      console.log("Error - getRandomPokemon: " + error.message);
      return error.message;
    }
  }

  async getRandomPokemove(): Promise<any> {
    try {

      const randomID: number = Math.floor(Math.random() * 844)

      const randomMove = await httpClient.GET(
        "/move/" + randomID
      );

      return randomMove;
    } catch (error) {
      console.log("Error - getRandomMove: " + error.message);
      return error.message;
    }
  }
}
