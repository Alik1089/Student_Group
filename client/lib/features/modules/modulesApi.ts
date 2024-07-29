import { IAddCourse, IAddModule, IAddUser, IUser } from '@/lib/types';
import  Cookies  from 'js-cookie';
import { ILogin } from "./../../types/index";
import { myAxios } from "@/lib/store";

export const getModulesApi = async () => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/module", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const delModuleApi = async(id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.delete(`/module/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const addModuleApi = async (obj:IAddModule) => {
    const token = await Cookies.get("token");
    console.log(obj, token);
    
    const { data } = await myAxios.post("/module", obj,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}