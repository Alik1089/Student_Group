import { IAddCourse } from '@/lib/types';
import { myAxios } from './../../store';
import Cookies from "js-cookie";


export const getCourseApi = async () => {
    const { data } = await myAxios.get("/course");
    return data;
};


export const delCourseApi = async(id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.delete(`/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const addCourseApi = async (obj:IAddCourse) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.patch("/course", obj,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}