// Import packages
import redis = require('redis');

class RedisClientInterface {

    const client = redis.createClient();;

    private static instance: RedisClientInterface;
    private constructor() {
    }
    static getInstance() {
        if (!RedisClientInterface.instance) {
            RedisClientInterface.instance = new RedisClientInterface();
        }
        return RedisClientInterface.instance;
    }
    
    // Functions
    // Init
    init() {
        this.client.set("game", "Tekken");
        console.log("You are now connected");

        this.client.on("connect", function () {
            console.log("You are now connected");
        });
    }


    // Crud functions
    showGame(game: string): string {
        this.client.get('game', function (err, reply) {
            if (reply) {
                console.log(reply);
                return reply
            }
        }
        );
        return "Game not found"
    }

    listGames(): string[] {
        let allGames: string[];

        return allGames;
    }
}


