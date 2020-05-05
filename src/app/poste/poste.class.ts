export interface PosteLight {
    id : string,
    title : string,
    author : string,
    dateCreated : Date,
    dateUploaded : Date,
    modificator : string,
    dateModificator : Date,
    vote : number
}

export interface Poste extends PosteLight {
    content : string,
}

export interface CreatePoste {
    title : string,
    content : string,
    author : string
}