export interface Poste {
    id : string,
    title : string,
    content : string,
    author : string,
    dateCreated : Date,
    dateUploaded : Date,
    modificator : string,
    dateModificator : Date,
    vote : number
};

export interface CreatePoste {
    title : string,
    content : string,
    author : string
};