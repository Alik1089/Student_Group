import  Cookies  from 'js-cookie';
import { myAxios } from "@/lib/store";
import { IAddModule } from '@/lib/types/adds';
import { IUpdateModule } from '@/lib/types/updates';

export const getModulesApi = async () => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/module", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getModuleByIdApi = async (id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/module/"+id,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

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

export const updateModuleByIdApi = async (id:number,obj:IUpdateModule|{name:string}|{courseId:number}) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.patch("/module/"+id, obj,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}