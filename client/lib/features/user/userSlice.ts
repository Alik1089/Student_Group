import { createAppSlice } from "@/lib/createAppSlice";
import { IUser } from "@/lib/types";
import { getUsers } from "./userApi";

export interface UserSliceState {
    users: IUser[];
    user: IUser;
}

const initialState: UserSliceState = {
    users: [],
    user: {} as IUser
};

export const usersSlice = createAppSlice({
    name: "users",
    initialState,
    reducers: {},
    selectors: {
        selectUsers: (users) => users.users,
        selectUser: (users) => users.user,
    },
    extraReducers:(build) => {
        build
         .addCase(getUsers.fulfilled, (state,action) => {
            state.users = action.payload
         })
    }
});

export const { } = usersSlice.actions;
export const { selectUsers, selectUser } = usersSlice.selectors;
