export interface IUpdateCourse{
    name:string;
    duration:number
}

export interface IUpdateGroup{
    name: string
    count:number
}

export interface IUpdateModule{
    name:string
    courseId:number 
}