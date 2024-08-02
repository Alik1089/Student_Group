import { IUpdateCourse } from '@/lib/types/updates';
import { myAxios } from './../../store';
import Cookies from "js-cookie";
import { IAddCourse } from '@/lib/types/adds';


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
    const { data } = await myAxios.post("/course", obj,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const updateCourseApi = async (id:number,obj:IUpdateCourse) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.patch("/course/"+id, obj,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const getCourseModules = async (id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/course/"+id,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}
