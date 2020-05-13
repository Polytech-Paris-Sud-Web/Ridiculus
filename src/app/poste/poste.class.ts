import { ID } from '../common.class';
import { V4 as uuid } from 'uuid';

export interface PosteLight {
    id: ID;
    title: string;
    author: string;
    dateCreated: Date;
    dateUploaded: Date;
    modificator: string;
    dateUpdated: Date;
    vote: number;
}

export interface Poste extends PosteLight {
    content: string;
}

export interface CreatePoste {
    id?: string;
    title: string;
    content: string;
    author: string;
    dateCreated?: Date;
}

export enum VoteType {
    UP = 1,
    NONE = 0,
    DOWN = -1,
}
