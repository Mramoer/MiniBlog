
export enum ReactionsType {
    Like = "like", 
    Anger = "anger",
    Smile = "smile",
    Sadness = "sadness",
}

export interface Comment {
    text: string, 
    id: number
}

export type Post = {
    header: string,
    description: string,
    filling: string,
    reactions?: ReactionsType,
    comments: Comment[];
    id: number,
}