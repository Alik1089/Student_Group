export interface IGroup{
    count:number
    id:number
    name:string
    teacherId:number
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
}

export interface IAddCourse{
    name:string;
    duration:number
}

export interface IAddModule{
    name:string;
    courseId:number;
}

export interface ITeacher{
    id:number,
    salary:number
}

export interface IStudent{
    id:number,
    group:IGroup
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

export interface IAddGroup{
    name: string
    teacherId:number
    count:number
    moduleId:number
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