import { IUser } from '@/lib/types';
import  Cookies  from 'js-cookie';
import { ILogin } from "./../../types/index";
import { myAxios } from "@/lib/store";

export const getUsersApi = async () => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const addSingleUserApi = async (obj:IUser) => {
    const token = Cookies.get("token");
    const {data} = await myAxios.post("/users", obj,{
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
