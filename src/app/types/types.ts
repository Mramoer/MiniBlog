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
    author: string;
    date: string;
  }
  
  export enum ReactionsType {
    Like = 'like',
    Anger = 'anger',
    Sadness = 'sadness',
    Smile = 'smile',
  }
  
  export interface Reaction {
    id: number;
    postId: number;
    type: ReactionsType;
  }