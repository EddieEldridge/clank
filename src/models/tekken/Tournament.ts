class Tournament {

    matches: Match[];
    numberOfMatches: number;

    constructor(numberOfMatches: number) {
        this.numberOfMatches = numberOfMatches;
     }

    public setNumberOfMatches(numberOfMatches: number) {
        this.numberOfMatches = numberOfMatches;
        this.matches.length = numberOfMatches;
    }

    public addNewMatch(player1: string, player2: string, pointsReward: number, player1Character: string, player2Character: string, inProgress: boolean, numberOfRounds: string, stage: string) {
        const newMatch: Match = new Match(player1, player2, pointsReward, player1Character, player1Character, inProgress, numberOfRounds, stage);
        this.matches.add(newMatch);
    }

}