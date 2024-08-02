import { createAppSlice } from "@/lib/createAppSlice";
import { IHomework } from "@/lib/types";
import {
    getHomeworkByGroupIdApi,
    getHomeworkByIdApi,
    getHomeworksApi,
} from "./homeworkApi";

export interface HomeworkSliceState {
    homeworks: IHomework[];
    homework: IHomework;
}

const initialState: HomeworkSliceState = {
    homeworks: [],
    homework: {} as IHomework,
};

export const homeworkSlice = createAppSlice({
    name: "homeworks",
    initialState,
    reducers: (create) => ({
        getHomeworksData: create.asyncThunk(
            async () => {
                return await getHomeworksApi();
            },
            {
                fulfilled: (state, action) => {
                    state.homeworks = action.payload;
                },
            }
        ),

        getHomeworkBYIdData: create.asyncThunk(
            async (id: number) => {
                return await getHomeworkByIdApi(id);
            },
            {
                fulfilled: (state, action) => {
                    state.homework = action.payload;
                },
            }
        ),

        getHomeworkBYgroupIdData: create.asyncThunk(
            async ({
                groupId,
                moduleId,
            }: {
                groupId: number;
                moduleId: number;
            }) => {
                return await getHomeworkByGroupIdApi(groupId, moduleId);
            },
            {
                fulfilled: (state, action) => {
                    if (Array.isArray(action.payload))
                        state.homeworks = action.payload;
                },
            }
        ),

        // delModuleData: create.asyncThunk(
        //     async (id: number) => {
        //         return await delModuleApi(+id);
        //     },
        //     {
        //         fulfilled: (state, action) => {
        //             state.homeworks = action.payload;
        //         },
        //     }
        // ),
        // addModule: create.asyncThunk(
        //     async (obj: IAddModule) => {
        //         return await addModuleApi(obj);
        //     },
        //     {
        //         fulfilled: (state, action) => {
        //             state.homeworks = action.payload;
        //         },
        //     }
        // ),
        // updateModuleData:create.asyncThunk(
        //     async({ id, obj }: { id: number; obj: IUpdateModule|{name:string}|{courseId:number} }) => {
        //         return await updateModuleByIdApi(id, obj)
        //     },
        //     {
        //         fulfilled:(state,action) => {
        //             state.homeworks = action.payload.homeworks
        //             state.homework = action.payload.homework
        //         }
        //     }
        // )
    }),
    selectors: {
        selectHomeworks: (homeworks) => homeworks.homeworks,
        selectHomework: (homeworks) => homeworks.homework,
    },
});

export const {
    getHomeworkBYgroupIdData,
    getHomeworkBYIdData,
    getHomeworksData,
} = homeworkSlice.actions;
export const { selectHomeworks, selectHomework } = homeworkSlice.selectors;
