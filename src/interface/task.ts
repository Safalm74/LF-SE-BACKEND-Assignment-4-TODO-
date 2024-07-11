export interface ITask{
    id:string;
    user_id:string;
    name:string;
    is_finished:boolean;
}

export interface IRefreshToken{
    user_id:string;
    token:string;
}