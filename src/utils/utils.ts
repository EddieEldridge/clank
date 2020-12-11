export function convertArrayToString(array: Array<string>, seperator: string, seperate: boolean): string {
    try {
        let string: string = array.toString();
        if (seperate) {
            string = string.replace(",", " ");
        }
        return string;
    } catch (error) {
    }

}

export function pickRandomElement(array: Array<string>): string {

    try {
        let decision: string;

        // Add Decides
        array.push("Luke decides");
        array.push("Eddie decides");
        array.push("Michael decides");

        decision = array[Math.floor(Math.random() * array.length)];

        return decision;
    } catch (error) {
    }

}