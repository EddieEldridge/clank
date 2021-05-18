
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
        '6. *prefix* - Change the default ">" prefix that clank uses\n';
        return helpCommands;
    } catch (error) {
        console.log(error);
    }
}

export function jsonify(response: string): JSON{
    const jsonString = JSON.stringify(response);
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function printResponse(response: any) {
    console.log("=== Response ====");
    console.log(response.status);
    console.log(response.data + response.statusText);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    return "";
}
