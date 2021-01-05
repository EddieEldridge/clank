// Import packages

// Constants
import { Tedis } from 'tedis';
const tedis = new Tedis({
    port: 6379,
});

export default class RedisClient {
    constructor() {
        // console.log("Initalized Redis Client...");
    }

    async addGame(gameName: string): Promise<number> {
        try {
            if (gameName.includes(',')) {
                gameName = gameName.replace(',', ' ');
            }
            console.log(
                'Attempting to add ' + gameName + ' to the Redis cache...'
            );

            // Add game to Redist list of games
            return await tedis.lpush('games', gameName);
        } catch (tsError) {
            console.log('Error: ' + tsError);
            return;
        }
    }

    async listGames(): Promise<Array<string>> {
        try {
            // List all games currently in cache
            return await tedis.lrange('games', 0, -1);
        } catch (error) {
            console.log('Error: ' + error);
            return;
        }
    }

    async removeGame(game: string): Promise<number> {
        try {
            console.log(game);
            // List all games currently in cache
            return await tedis.lrem('games', 0, game);
        } catch (error) {
            console.log('Error: ' + error);
            return;
        }
    }
}
