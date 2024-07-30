export interface IGroup{
    count:number
    id:number
    name:string
    teacherId:number
    teacher:ITeacher
    module:IModule
}

export interface ICourse{
    id:number;
    name:string;
    duration:number
}

export interface IModule{
    id:number;
    name:string;
    courseid:number
    course:ICourse
}

export interface IAddCourse{
    name:string;
    duration:number
}

export interface IAddModule{
    name:string;
    courseId:number;
}

export interface IAddGroup{
    name: string
    teacherId:number
    count:number
    moduleId:number
}

export interface ITeacher{
    userId:number,
    user:IUser
    salary:number
}

export interface IAddTeacher{

}

export interface IStudent{
    userId:number,
    group:IGroup
    user:IUser
    // rate:IRate
}


export interface IUser{
    id:number;
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    role: number;
    phoneNumber: string;
    salary: number,
    groupId: number,
    teacher:ITeacher,
    student:IStudent
}

export interface IAddUser{
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    role: number;
    phoneNumber: string;
    salary: number,
    groupId: number,
}


export interface ILogin{
    username:string
    password:string
}

export interface IGroup{
    id:number,
    name:string,
    teacherId:number,
    count:number,
    moduleId:number
}