export type UUID<T=any> = string;
export type DocumentIds<T> = UUID<T>[];

export interface UserKey {
    Id: UUID
    FullName: string
}

export interface User extends UserKey {
    Words: DocumentIds<Word>
    Associations: Associations
}

export interface Associations {
    [word: string]: Association
}

export interface Association {
    hits: number
    lookups: Lookup[]
}

export interface Word {
    word: string
    definitions: DocumentIds<Definition>
    related: DocumentIds<Word>
}

enum PartOfSpeech {
    'Noun',
    'Verb',
    'Adjective',
    'Adverb',
    'Preposition',

}

export interface Definition {
    source: string
    definition: string
    pos: PartOfSpeech
}

export interface Lookup {
    date: string
    source: UUID<Book> | string
}

export interface Book {
    name: string
    author: string
}

export interface StringObject<T = any> {
    [key: string]: T
}
