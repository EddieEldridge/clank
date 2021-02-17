class LOTRCharacter {
    
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

    constructor(name: string, height: string, race: string, gender: string, birth: string, spouse: string, death: string, realm: string, hair: string, wikiUrl: string){
        this.name = name;
        this.height = height;
        this.race = race;
        this.gender = gender;
        this.birth = birth;
        this.spouse = spouse;
        this.death = death;
        this.realm = realm;
        this.hair = hair;
        this.wikiUrl = wikiUrl;
    }

    
}

export default LOTRCharacter;