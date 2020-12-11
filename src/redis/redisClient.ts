// Import packages
import { resolve } from "path";
import { convertArrayToString } from "../utils/utils";

// Constants
const { Tedis, TedisPool } = require("tedis");
const tedis = new Tedis({
  port: 6379
});

export default class RedisClient {

  constructor() {
    // console.log("Initalized Redis Client...");
  }

  async addGame(gameName: string) {

    try {
      if (gameName.includes(",")) {
        gameName = gameName.replace(',', " ");
      }
      console.log("Attempting to add " + gameName + " to the Redis cache...");

      // Add game to Redist list of games
      await tedis.lpush("games", gameName)
       
    } catch (tsError) {
      console.log("Error: " + tsError);
    }
  }

  async listGames(): Promise<Array<string>> {
    try {
      // List all games currently in cache
      return await tedis.lrange("games", 0, -1);
    } catch (error) {
      console.log("Error: " + error);
      return;
    }

  }

  async removeGame(game: string): Promise<Array<string>> {
    try {
      console.log(game)
      // List all games currently in cache
      return await tedis.lrem("games", 0, game);
    } catch (error) {
      console.log("Error: " + error);
      return;
    }

  }
}

