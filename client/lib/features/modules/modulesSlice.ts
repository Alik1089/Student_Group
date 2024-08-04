import { IModule } from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";
import { addModuleApi, delModuleApi, getModulesByGroupIdApi, getModuleByIdApi, getModulesApi, updateModuleByIdApi } from "./modulesApi";
import { IAddModule } from "@/lib/types/adds";
import { IUpdateModule } from "@/lib/types/updates";

export interface ModuleSliceState {
    modules: IModule[];
    module: IModule
}

const initialState: ModuleSliceState = {
    modules: [],
    module: {} as IModule
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
                    state.modules = action.payload;
                },
            }
        ),

        getModuleByIdData: create.asyncThunk(
            async (id: number) => {
                return await getModuleByIdApi(id);
            },
            {
                fulfilled: (state, action) => {
                    state.module = action.payload;
                },
            }
        ),

        getModulesByGroupIdData: create.asyncThunk(
            async (id: number) => {
                return await getModulesByGroupIdApi(id);
            },
            {
                fulfilled: (state, action) => {
                    state.modules = action.payload;
                },
            }
        ),

        delModuleData: create.asyncThunk(
            async (id: number) => {
                return await delModuleApi(+id);
            },
            {
                fulfilled: (state, action) => {
                    state.modules = action.payload;
                },
            }
        ),
        addModule: create.asyncThunk(
            async (obj: IAddModule) => {
                return await addModuleApi(obj);
            },
            {
                fulfilled: (state, action) => {
                    state.modules = action.payload;
                },
            }
        ),
        updateModuleData: create.asyncThunk(
            async ({ id, obj }: { id: number; obj: IUpdateModule | { name: string } | { courseId: number } }) => {
                return await updateModuleByIdApi(id, obj)
            },
            {
                fulfilled: (state, action) => {
                    state.modules = action.payload.modules
                    state.module = action.payload.module
                }
            }
        )
    }),
    selectors: {
        selectModules: (modules) => modules.modules,
        selectModule: (modules) => modules.module,
    },
});

export const { getModulesData, delModuleData, addModule, updateModuleData, getModuleByIdData, getModulesByGroupIdData } =
    modulesSlice.actions;
export const { selectModules, selectModule } = modulesSlice.selectors;
