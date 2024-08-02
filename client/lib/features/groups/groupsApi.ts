import { IUpdateGroup } from './../../types/updates/index';
import  Cookies  from 'js-cookie';
import { myAxios } from "@/lib/store";
import { IAddGroup } from '@/lib/types/adds';

export const getGroupsApi = async () => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/group", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getGroupsByTeacheridApi = async(id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/group/teacher/"+id, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const delGroupApi = async(id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.delete(`/group/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const addGroupApi = async (obj:IAddGroup) => {
    const token = await Cookies.get("token");
    console.log(obj, token);
    const { data } = await myAxios.post("/group", obj,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const getGroupByIdApi = async (id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/group/"+id,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const updateGroupByIdApi = async (id:number,obj:IUpdateGroup|{moduleId:number}|{teacherId:number}) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.patch("/group/"+id, obj,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const delStudent = async(id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.delete("/student/group/"+id,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}