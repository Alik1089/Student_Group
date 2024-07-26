export interface IUser{
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    role: number;
    phoneNumber: string;
}

export interface ILogin{
    username:string
    password:string
}