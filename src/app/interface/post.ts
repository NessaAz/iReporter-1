import { User } from "../components/models/user";

export interface Post {
    title:string;
    info:string;
    user:User;
    location:string;
    
}
