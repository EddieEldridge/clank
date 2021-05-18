class Match {

    pointsReward: number;
    player1: string;
    player2: string;
    player1Character: string;
    player2Character: string;
    inProgress: boolean;
    numberOfRounds: string;
    stage: string;

    constructor(player1: string, player2: string, pointsReward: number, player1Character: string, player2Character: string, inProgress: boolean, numberOfRounds: string, stage: string) {
        this.pointsReward = pointsReward;
        this.player1 = player1;
        this.player2 = player2;
        this.player1Character = player1Character;
        this.player2Character = player2Character;
        this.inProgress = inProgress;
        this.numberOfRounds = numberOfRounds;
        this.stage = stage;
    }
}

export default Match;