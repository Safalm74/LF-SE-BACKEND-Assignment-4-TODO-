export interface IUser{
    id:string;
    name:string;
    email:string;
    password:string;
    permissions:string[];
    role:'super_user' | 'user';
}