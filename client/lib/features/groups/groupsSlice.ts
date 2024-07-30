import { IGroup } from '@/lib/types';
import { IAddGroup } from '@/lib/types';
import { createAppSlice } from "@/lib/createAppSlice";
import { addGroupApi, delGroupApi, getGroupsApi } from './groupsApi';

export interface GroupSliceState {
    group: IGroup[];
}

const initialState: GroupSliceState = {
    group: [],
};

export const groupsSlice = createAppSlice({
    name: "group",
    initialState,
    reducers: (create) => ({
        getGroupsData: create.asyncThunk(
            async () => {
                return await getGroupsApi();
            },
            {
                fulfilled: (state, action) => {
                    state.group = action.payload;
                },
            }
        ),

        delGroupData: create.asyncThunk(
            async (id: number) => {
                return await delGroupApi(+id);
            },
            {
                fulfilled: (state, action) => {
                    state.group = action.payload;
                },
            }
        ),
        addGroup: create.asyncThunk(
            async (obj: IAddGroup) => {
                return await addGroupApi(obj);
            },
            {
                fulfilled: (state, action) => {
                    state.group = action.payload;
                },
            }
        ),
    }),
    selectors: {
        selectGroup: (group) => group.group,
    },
});

export const { getGroupsData, delGroupData, addGroup } =
    groupsSlice.actions;
export const { selectGroup } = groupsSlice.selectors;