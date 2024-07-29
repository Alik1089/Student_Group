import {
    IGroup,
    ILogin,
    IAddUser,
    ICourse,
    IAddCourse,
} from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";
import { IUser } from "@/lib/types";
import {
    addCourseApi,
    addSingleUserApi,
    delUserApi,
    getGroupApi,
    getUsersApi,
    loginUserApi,
    profileUserApi,
} from "./userApi";

export interface UserSliceState {
    users: IUser[];
    user: IUser;
    status: boolean;
    groups: IGroup[];
    courses: ICourse[];
}

const initialState: UserSliceState = {
    users: [],
    user: {} as IUser,
    status: true,
    groups: [],
    courses: [],
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

        getGroupsData: create.asyncThunk(
            async () => {
                return await getGroupApi();
            },
            {
                fulfilled: (state, action) => {
                    state.groups = action.payload;
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

        addCourse: create.asyncThunk(
            async (obj: IAddCourse) => {
                return await addCourseApi(obj);
            },
            {
                fulfilled: (state, action) => {
                    state.courses = action.payload;
                },
            }
        ),
    }),
    selectors: {
        selectUsers: (users) => users.users,
        selectUser: (users) => users.user,
        selectStatus: (users) => users.status,
        selectGroups: (users) => users.groups,
        selectCourse: (users) => users.courses,
    },
});

export const {
    getUsersData,
    loginUser,
    profileUser,
    addUser,
    getGroupsData,
    delUserData,
    addCourse,
} = usersSlice.actions;
export const {
    selectUsers,
    selectUser,
    selectStatus,
    selectGroups,
    // selectCourse,
} = usersSlice.selectors;
