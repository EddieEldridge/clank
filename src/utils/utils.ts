
export function convertArrayToString(
    array: Array<string>,
    seperator: string,
    seperate: boolean
): string {
    try {
        let string: string = array.toString();
        if (seperate) {
            string = string.split(seperator).join(' ');
        }
        return string;
    } catch (error) {
        console.log(error);
    }
}

export function pickRandomElementFromArray(array: Array<string>): string {
    try {
        return array[Math.floor(Math.random() * array.length)];
    } catch (error) {
        console.log(error);
    }
}

export function showHelp(): string {
    try {
        const helpCommands: string =
        '=== Commands ===\n' +
        '1. *wotd* - Word of the Day\n' +
        '2. *define* - Define a given word\n' +
        '3. *roll* - Roll a dice. Same format as Roll20\n' +
        '4. *lotrgc* - Get info about a Lord of the Rings Character\n' +
        '5. *lotrq* - Get a random quote from a Lord of the Rings\n' +
        '6. *yugioh* - Get a random Yugioh card\n';
        '7. *yugiohs* - Get information about a specific Yugioh card\n';
        '8. *pokemon* - Get a random Pokemon\n';
        '9. *pokemove* - Get a random Pokemon move\n';
        '10. *hotd* - Get a random historical event for the day\n';
        '11. *define {word}* - Get the definition of a word\n';
        return helpCommands;
    } catch (error) {
        console.log(error);
    }
}

export function printResponse(response: any) {
    console.log("=== Response ====");
    console.log(response.status);
    console.log(response.data + response.statusText);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    return "";
}

export function capitalize (s: string): string {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}