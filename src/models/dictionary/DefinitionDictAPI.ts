import Meanings from "./Meanings";
import Phonetics from "./Phoentics";

class DefinitionDictAPI{
    
    meanings: Array<Meanings>;
    phonetics: Array<Phonetics>;
    word: string;
    text: string;
    source: string;
    partofSpeech: string;

    constructor(meanings: Array<Meanings>, phonetics: Array<Phonetics>, word: string){
        this.meanings = meanings;
        this.phonetics = phonetics;
        this.word = word;
    }
}

export default DefinitionDictAPI;