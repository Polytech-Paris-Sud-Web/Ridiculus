import { ID } from '../common.class';

export interface PosteLight {
    id: ID;
    title: string;
    author: string;
    dateCreated: Date;
    dateUploaded: Date;
    modificator: string;
    dateModificator: Date;
    vote: number;
}

export interface Poste extends PosteLight {
    content: string;
}

export interface CreatePoste {
    title: string;
    content: string;
    author: string;
}

export enum VoteType {
    UP = 1,
    NONE = 0,
    DOWN = -1,
}
