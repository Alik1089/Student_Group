import { IGroup } from "@/lib/types";
import { createAppSlice } from "@/lib/createAppSlice";
import {
    addGroupApi,
    delGroupApi,
    getGroupsApi,
    getGroupByIdApi,
    updateGroupByIdApi,
    delStudent,
    getGroupsByTeacheridApi,
} from "./groupsApi";
import { IAddGroup } from "@/lib/types/adds";
import { IUpdateGroup } from "@/lib/types/updates";

export interface GroupSliceState {
    groups: IGroup[];
    group: IGroup;
}

const initialState: GroupSliceState = {
    groups: [],
    group: {} as IGroup,
};

export const groupsSlice = createAppSlice({
    name: "groups",
    initialState,
    reducers: (create) => ({
        getGroupsData: create.asyncThunk(
            async () => {
                return await getGroupsApi();
            },
            {
                fulfilled: (state, action) => {
                    state.groups = action.payload;
                },
            }
        ),

        getGroupsByTeacherId: create.asyncThunk(
            async(id:number) => {
                return await getGroupsByTeacheridApi(id)
            },
            {
                fulfilled: (state, action) => {
                    state.groups = action.payload;
                },
            }
        ),

        delGroupData: create.asyncThunk(
            async (id: number) => {
                return await delGroupApi(+id);
            },
            {
                fulfilled: (state, action) => {
                    state.groups = action.payload;
                },
            }
        ),
        
        addGroup: create.asyncThunk(
            async (obj: IAddGroup) => {
                return await addGroupApi(obj);
            },
            {
                fulfilled: (state, action) => {
                    state.groups = action.payload;
                },
            }
        ),
        getGroupByIdData: create.asyncThunk(
            async (id: number) => {
                return await getGroupByIdApi(id);
            },
            {
                fulfilled: (state, action) => {
                    state.group = action.payload;
                },
            }
        ),
        updateGroupData: create.asyncThunk(
            async ({ id, obj }: { id: number; obj: IUpdateGroup|{moduleId:number}|{teacherId:number} }) => {
                console.log(id, obj);
                return await updateGroupByIdApi(id, obj);
            },
            {
                fulfilled: (state, action) => {
                    console.log(action);
                    state.groups = action.payload.groups;
                    state.group = action.payload.group;
                },
            }
        ),
        delStudentGroup:create.asyncThunk(
            async(id:number) => {
                return await delStudent(id)
            },
        )
    }),
    selectors: {
        selectGroups: (groups) => groups.groups,
        selectGroup: (groups) => groups.group,
    },
});

export const { getGroupsData, delGroupData, addGroup, getGroupByIdData, updateGroupData, delStudentGroup, getGroupsByTeacherId } =
    groupsSlice.actions;
export const { selectGroups, selectGroup } = groupsSlice.selectors;
