import  Cookies  from 'js-cookie';
import { myAxios } from "@/lib/store";

export const getHomeworksApi = async() => {
    const token = await Cookies.get("token")
    const { data } = await myAxios.get("/homework/",  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const getHomeworkByIdApi = async (id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/homework/"+id,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}


export const getHomeworkByGroupIdApi = async (groupId:number, moduleId:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/homework/group_module/"+groupId+"/"+moduleId,  {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}


