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

export interface IRate{
    homeworkId:number,
    studentId:number,
    rate:number
}

interface IModelExamp{
    id:number
    name:string
    courseId:number
}

export interface INewModule{
    groupId:number
    model:IModelExamp
    modelId:number
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
    image: string;
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

export interface IRatesModal{
    isOpen:boolean,
    closeModal:Function,
    studentId:number
    homeworkId:number
    grate:number
}

export interface ISearchGroup{
    groupId:number
}

export interface ISearchModule{
    moduleId:number
}