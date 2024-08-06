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

export interface IAddHomework {
    name:string,
    groupId:number,
    moduleId:number,
    description:string
}

export interface IAddTeacher{
    
}
