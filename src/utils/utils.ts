
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

export function jsonify(response: string): JSON{
    const jsonString = JSON.stringify(response);
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function printResponse(response: any) {
    console.log("=== Response ====");
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    return "";
}
