
// export enum ReactionsType {
//     Like = "like", 
//     Anger = "anger",
//     Smile = "smile",
//     Sadness = "sadness",
// }

// export interface Comment {
//     text: string, 
//     id: number
// }

// export type Post = {
//     header: string,
//     description: string,
//     filling: string,
//     reaction?: ReactionsType | null,
//     comments: Comment[],
//     id: number,
// }

export interface Post {
    id: number;
    title: string;
    description: string;
    content: string;
  }
  
  export interface Comment {
    id: number;
    postId: number;
    text: string;
  }
  
  export enum ReactionType {
    Like = 'like',
    Anger = 'anger',
    Sadness = 'sadness',
    Smile = 'smile',
  }
  
  export interface Reaction {
    id: number;
    postId: number;
    type: ReactionType;
  }