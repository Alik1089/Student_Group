import { groupsSlice } from './features/groups/groupsSlice';
import  axios from 'axios';
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { usersSlice } from './features/user/userSlice';
import { courseSlice } from './features/courses/courseSlice';
import { modulesSlice } from './features/modules/modulesSlice';

export const myAxios = axios.create({
  baseURL:"http://localhost:8080"
})

const rootReducer = combineSlices( usersSlice, modulesSlice, courseSlice, groupsSlice );
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;


