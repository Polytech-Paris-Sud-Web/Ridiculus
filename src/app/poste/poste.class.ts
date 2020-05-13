import { ID } from '../common.class';
import { V4 as uuid } from 'uuid';

export interface PosteLight {
    _id: ID;
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
    _id?: string;
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

export interface Vote {
    id: ID;
    nb: VoteType;
}