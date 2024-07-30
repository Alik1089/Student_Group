import { IAddGroup } from '@/lib/types';
import  Cookies  from 'js-cookie';
import { myAxios } from "@/lib/store";

export const getGroupsApi = async () => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/group", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


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