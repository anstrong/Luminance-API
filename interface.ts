import { ObjectId } from "mongodb"

interface MongoDocument {
    _id: string//ObjectId
}

export type OIDString<T extends MongoDocument> = string;
export type OIDs<T extends MongoDocument> = ObjectId[];
export type DocumentIds<T extends MongoDocument> = OIDString<T>[];

export interface User extends MongoDocument {
    words: DocumentIds<Word>
    associations: Associations
}

export interface Associations {
    [word: string]: Association
}

export interface Association {
    hits: number
    lookups: Lookup[]
}

export interface Word extends MongoDocument {
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

export interface Definition extends MongoDocument {
    source: string
    definition: string
    pos: PartOfSpeech
}

export interface Lookup {
    date: string
    source: OIDString<Book> | string
}

export interface Book extends MongoDocument {
    name: string
    author: string
}
