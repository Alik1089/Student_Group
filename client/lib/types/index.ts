export interface ICourse{
    id:number;
    name:string;
    duration:number
    module:IModule[]
}

export interface IModule{
    id:number;
    name:string;
    courseid:number
    course:ICourse
}


export interface ITeacher{
    userId:number,
    user:IUser
    salary:number
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



export interface ILogin{
    username:string
    password:string
}

export interface IGroup{
    id:number,
    name:string,
    teacherId:number,
    count:number,
    teacher:ITeacher
    moduleId:number
    module:IModule
    student:IStudent[]
}

export interface IHomework{
    id:number,
    name:string,
    description:string,
    groupId:number,
    modelId:number,
    group:IGroup,
    model:IModule,
}

export interface ICourseModal{
    isOpen:boolean,
    closeModal:Function,
    courseId:number
}

export interface IGroupModal{
    isOpen:boolean,
    closeModal:Function,
    groupId:number
}

export interface IModuleModal{
    isOpen:boolean,
    closeModal:Function,
    moduleId:number
}

export interface IHomewrorkModal{
    isOpen1:boolean,
    closeModal:Function,
    groupId:number
    moduleId:number
}