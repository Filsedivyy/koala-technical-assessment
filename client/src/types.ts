export interface Character {
    ID: string;
    Name: string;
    Gender: string;
    Ability: string;
    "Minimal distance": string;
    Weight: string;
    Born: string;
    "In space since": string;
    "Beer consumption (l/y)": string;
    "Knows the answer?": string;
}

export interface Nemesis {
    ID: string;
    "Character ID": string;
    "Is alive?": string;
    Years: string;
}

export interface Secrete {
    ID: string;
    "Nemesis ID": string;
    "Secrete Code": string;
}

export interface Children {
    has_nemesis?: {
        records: NemesisRecord[];
    };
}

export interface NemesisRecord {
    data: Nemesis;
    children?: {
        has_secrete?: {
            records: SecreteRecord[];
        };
    };
}

export interface SecreteRecord {
    data: Secrete;
    children?: {};
}

export interface CharacterRecord {
    data: Character;
    children?: Children;
}

export type CharacterData = CharacterRecord[];
