import { myAxios } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk ( 
    "getUsers",
    async () => {
        const { data } = await myAxios.get(
            "/users",
        );
        return data;
    }
)