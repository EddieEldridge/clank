import { LOTRCharacter } from '../models/Interfaces'

export function convertArrayToString(
    array: Array<string>,
    seperator: string,
    seperate: boolean
): string {
    try {
        let string: string = array.toString();
        if (seperate) {
            string = string.replace(',', ' ');
        }
        return string;
    } catch (error) {
        console.log(error);
    }
}

export function pickRandomElement(array: Array<string>): string {
    try {
        // Add Decides
        array.push('Luke decides');
        array.push('Eddie decides');
        array.push('Michael decides');

        return array[Math.floor(Math.random() * array.length)];
    } catch (error) {
        console.log(error);
    }
}

export function showHelp(): string {
    try {
        const message: string =
        "**== Dictionary ==**" + "\n" +
        "*Command:* !wotd" + "\n" +
        "*Result:* Get the Word of the Day and it's definition" + "\n" +
        "*Command:* !define <word>" + "\n" +
        "*Result:* Define a word" + "\n" +  "\n" +
        "**== Lord of the Rings ==**" + "\n" +
        "*Command:* !lotrgc <characterName>" + "\n" +
        "*Result:* Get information about the given character" + "\n" +
        "*Command:* !lotrquoute " + "\n" +
        "*Result:* Get a random quote from Lord of the Rings" + "\n" + "\n" +
        "**== Dice Roller ==**" + "\n" +
        "*Command:* !roll <xdy>" + "\n" +
        "*Result:* Roll dice. Same format as Roll20" + "\n";

        return message;
            
    } catch (error) {
        console.log(error);
        return error;
    }
}

export function printResponse(response: any){
    console.log("=== Response (data) ====");
    console.log(response.data);

    console.log("Status: " + response.status + " - " +  response.statusText);
    // console.log(response .headers);
    // console.log(response.config); 
    return;
}

export function processCharacter(json: string): string{
    let character: string;

    return character;
}