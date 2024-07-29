import { IModule, IAddModule } from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";
import { addModuleApi, delModuleApi, getModulesApi } from "./modulesApi";

export interface ModuleSliceState {
    module: IModule[];
}

const initialState: ModuleSliceState = {
    module: [],
};

export const modulesSlice = createAppSlice({
    name: "module",
    initialState,
    reducers: (create) => ({
        getModulesData: create.asyncThunk(
            async () => {
                return await getModulesApi();
            },
            {
                fulfilled: (state, action) => {
                    state.module = action.payload;
                },
            }
        ),

        delModuleData: create.asyncThunk(
            async (id: number) => {
                return await delModuleApi(+id);
            },
            {
                fulfilled: (state, action) => {
                    state.module = action.payload;
                },
            }
        ),
        addModule: create.asyncThunk(
            async (obj: IAddModule) => {
                return await addModuleApi(obj);
            },
            {
                fulfilled: (state, action) => {
                    state.module = action.payload;
                },
            }
        ),
    }),
    selectors: {
        selectModule: (module) => module.module,
    },
});

export const { getModulesData, delModuleData, addModule } =
    modulesSlice.actions;
export const { selectModule } = modulesSlice.selectors;
