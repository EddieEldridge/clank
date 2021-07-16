import Tournament from './models/tekken/Tournament'
import { TekkenStages, TekkenCharacters } from './constants/tekken/TekkenData'
import { pickRandomElementFromArray } from './utils/utils';
import Match from '../models/tekken/Match';

export function tournamentStartingMessage(): string {
    try {
        const helpCommands: string =
        '=== Tekken Tournament Manager ===\n' +
        '*What kind of tournament do you want to play?*\n' +
        '1. *Lightning* - Define a given word\n' +
        '2. *Standard* - Roll a dice. Same format as Roll20\n' +
        '3. *Epic* - Roll a dice. Same format as Roll20\n';
        return helpCommands;
    } catch (error) {
        console.log(error);
    }
}

export function createNewTournament(matchType: string) {

    // 1. Decide how many rounds each player will play
    const numberOfRounds: number = determineNumberOfRounds(matchType);

    // 2. Create and setup Tournament instance
    const tournament = new Tournament(numberOfRounds);

    // 3. Decide who will play and how many points the match is worth and who they will have to play
    const match =
    tournament.matches.add()

    // 4. Wait until the match is finished

    // 5. Store the results in the Tournament

    // 6. Repeat steps 3-5 until every player has played an equal number of rounds



}


export function addMatchToTournament(matchType: string) {



    // 4. Wait until the match is finished

    // 5. Store the results in the Tournament

    // 6. Repeat steps 3-5 until every player has played an equal number of rounds



}

function pickRandomCharacter(): string {
    return pickRandomElementFromArray(TekkenCharacters);
}

function pickRandomStage(): string {
    return pickRandomElementFromArray(TekkenStages);
}

function determineNumberOfRounds(matchType: string): number {
    switch (matchType) {
        case 'Lightning':
            return 3;
        case 'Standard':
            return 6;
        case 'Epic':
            return 12;
        case 'Legendary':
            return 18;
        default:
            return 6;
    }
}