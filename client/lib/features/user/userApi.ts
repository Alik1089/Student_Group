import  Cookies  from 'js-cookie';
import { ILogin } from "./../../types/index";
import { myAxios } from "@/lib/store";
import { IAddUser } from '@/lib/types/adds';

export const getUsersApi = async (role?:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/users"+(role || role==0?"?role="+role:""), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getTeachersApi = async () => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/teacher", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const delUserApi = async (id:number) => {
    console.log(id);
    const token = await Cookies.get("token");
    const { data } = await myAxios.delete(`/users/${+id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const addSingleUserApi = async (obj:IAddUser) => {
    const token = Cookies.get("token");
    console.log(obj);
    
    const {data} = await myAxios.post("/users", obj,{
        headers: { Authorization: `Bearer ${token}` },
    })
    return data
}

export const addTeacherApi = async (obj:IAddUser) => {
    const token = Cookies.get("token");
    const {data} = await myAxios.post("/teacher", obj,{
        headers: { Authorization: `Bearer ${token}` },
    })
    return data
}

export const loginUserApi = async (obj: ILogin) => {
    const { data } = await myAxios.post("/auth/login", obj);
    return data;
};

export const profileUserApi =  async () => {
    const token = Cookies.get("token");
    try {
        const { data } = await myAxios.get(`/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (e) {
        return true;
    }
};
