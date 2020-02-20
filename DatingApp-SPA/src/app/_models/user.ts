import { Photo } from './Photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    photoUrl: string;
    interests?: string;
    introduciton?: string;
    lookingFor?: string;
    photos?: Photo[];
}

