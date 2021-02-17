export interface LOTRCharacter {
    name: string;
    height: string;
    race: string;
    gender: string;
    birth: string;
    spouse: string;
    death: string;
    realm: string;
    hair: string;
    wikiUrl: string;
}

export interface LOTRQuote {
    quoute: string;
    character: string;
    movie: string;
}

export interface DefinitionExamples {
    id: number;
    text: string;
    title: string;
    url: string;
}

export interface Definition {
    note: number;
    partOfSpeech: string;
    source: string;
    text: string;
}

export interface DefinitionResponse {
    definitions: Array<Definition>;
    examples: Array<DefinitionExamples>;
    note: string;
    word: string;
}