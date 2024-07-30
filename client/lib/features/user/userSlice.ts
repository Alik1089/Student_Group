import { ILogin, IAddUser, ITeacher } from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";
import { IUser } from "@/lib/types";
import {
    addSingleUserApi,
    delUserApi,
    getTeachersApi,
    getUsersApi,
    loginUserApi,
    profileUserApi,
} from "./userApi";

export interface UserSliceState {
    users: IUser[];
    user: IUser;
    status: boolean;
    teachers:ITeacher[]
}

const initialState: UserSliceState = {
    users: [],
    user: {} as IUser,
    status: true,
    teachers:[]
};

export const usersSlice = createAppSlice({
    name: "users",
    initialState,
    reducers: (create) => ({
        getUsersData: create.asyncThunk(
            async (role?:number) => {
                return await getUsersApi(role);
            },
            {
                fulfilled: (state, action) => {
                    state.users = action.payload;
                },
            }
        ),

        getTeacherData:create.asyncThunk(
            async () => {
                return await getTeachersApi()
            },
            {
                fulfilled: (state, action) => {
                    state.teachers = action.payload;
                },
            }
        ),

        delUserData: create.asyncThunk(
            async (id: number) => {
                return await delUserApi(+id);
            },
            {
                fulfilled: (state, action) => {
                    state.users = action.payload;
                },
            }
        ),

        loginUser: create.asyncThunk(async (obj: ILogin) => {
            return await loginUserApi(obj);
        }),

        profileUser: create.asyncThunk(
            async () => {
                return await profileUserApi();
            },
            {
                fulfilled: (state, action) => {
                    state.user = action.payload;
                    state.status = false;
                },
                pending: (state, action) => {
                    state.status = true;
                },
            }
        ),
        logoutUser:create.reducer((state, action)=>{
            state.user = {} as IUser
        }),
        addUser: create.asyncThunk(
            async (obj: IAddUser) => {
                return await addSingleUserApi(obj);
            },
            {
                fulfilled: (state, action) => {
                    state.users = action.payload;
                },
            }
        ),
    }),
    selectors: {
        selectUsers: (users) => users.users,
        selectUser: (users) => users.user,
        selectStatus: (users) => users.status,
        selectTeachers: (users) => users.teachers,
    },
});

export const { getUsersData, loginUser, profileUser, addUser, delUserData, getTeacherData,logoutUser} =
    usersSlice.actions;
export const { selectUsers, selectUser, selectStatus, selectTeachers } = usersSlice.selectors;
