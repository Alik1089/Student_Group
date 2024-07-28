import { ILogin } from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";
import { IUser } from "@/lib/types";
import { addUserApi, getUsersApi, loginUserApi, profileUserApi } from "./userApi";

export interface UserSliceState {
    users: IUser[];
    user: IUser;
    status:boolean
}

const initialState: UserSliceState = {
    users: [],
    user: {} as IUser,
    status:true
};

export const usersSlice = createAppSlice({
    name: "users",
    initialState,
    reducers: (create) => ({
        getUsersData: create.asyncThunk(
            async () => {
                return await getUsersApi();
            },
            {
                fulfilled: (state, action) => {
                    state.users = action.payload;
                },
            }
        ),
        loginUser: create.asyncThunk(
            async (obj: ILogin) => {
                return await loginUserApi(obj);
            },
        ),
        profileUser: create.asyncThunk(
            async () => {
            return await profileUserApi();
        }, {
            fulfilled:(state, action)=>{
                state.user  = action.payload;
                state.status = false
            },
            pending:(state, action)=>{
                state.status = true
            }
        }),
        addUser: create.asyncThunk(
            async(obj:IUser) => {
                return await addUserApi(obj)
            }, {
                fulfilled:(state, action)=>{
                    state.users = action.payload;
                },
            }
        )
    }),
    selectors: {
        selectUsers: (users) => users.users,
        selectUser: (users) => users.user,
        selectStatus: (users) => users.status,
    },
});

export const { getUsersData, loginUser, profileUser, addUser } = usersSlice.actions;
export const { selectUsers, selectUser , selectStatus} = usersSlice.selectors;
