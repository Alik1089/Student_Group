import { myAxios } from '@/lib/store';
import  Cookies  from 'js-cookie';

export const getRatesApi = async () => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/rate", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const getRatesByIdApi = async (id:number) => {
    const token = await Cookies.get("token");
    const { data } = await myAxios.get("/rate/"+id, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

