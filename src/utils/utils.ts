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
        return 'TO-DO-ADD-COMMANDS';
    } catch (error) {
        console.log(error);
    }
}
