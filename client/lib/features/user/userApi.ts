import { IUser } from '@/lib/types';
import  Cookies  from 'js-cookie';
import { ILogin } from "./../../types/index";
import { myAxios } from "@/lib/store";

export const getUsersApi = async () => {
    const { data } = await myAxios.get("/users", {
        headers: {
            Authorization: "bearer " + localStorage.token,
        },
    });
    return data;
};

export const addUserApi = async (obj:IUser) => {
    const {data} = await myAxios.post("/users", obj,{
        headers: {
            Authorization: "bearer " + localStorage.token,
        },
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
