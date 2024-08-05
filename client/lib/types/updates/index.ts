export interface IUpdateCourse {
    name: string;
    duration: number;
}

export interface IUpdateGroup {
    name: string;
    count: number;
}

export interface IUpdateModule {
    name: string;
    courseId: number;
}

export interface IUpdateNameSurname {
    name: string;
    surname: string;
}

export interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IUpdateImage {
    lastModified: 1648125324527;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}
