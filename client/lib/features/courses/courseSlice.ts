import { IModule, ICourse } from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";
import {
    addCourseApi,
    delCourseApi,
    getCourseApi,
    getCourseModules,
    updateCourseApi,
} from "./courseApi";
import { IAddCourse } from "@/lib/types/adds";
import { IUpdateCourse } from "@/lib/types/updates";

export interface CourseSliceState {
    courses: ICourse[];
    course: ICourse
}

const initialState: CourseSliceState = {
    courses: [],
    course: {} as ICourse
};

export const courseSlice = createAppSlice({
    name: "courses",
    initialState,
    reducers: (create) => ({
        getCoursesData: create.asyncThunk(
            async () => {
                return await getCourseApi();
            },
            {
                fulfilled: (state, action) => {
                    state.courses = action.payload;
                },
            }
        ),
        delCourseData: create.asyncThunk(
            async (id: number) => {
                return await delCourseApi(+id);
            },
            {
                fulfilled: (state, action) => {
                    state.courses = action.payload;
                },
            }
        ),
        addCourse: create.asyncThunk(async (obj: IAddCourse) => {
            return await addCourseApi(obj);
        }),
        updateCourse: create.asyncThunk(
            async ({ id, obj }: { id: number; obj: IUpdateCourse }) => {
                return await updateCourseApi(id, obj);
            },
            {
                fulfilled: (state, action) => {
                    state.courses = action.payload;
                },
            }
        ),
        getCourseByIdData:create.asyncThunk(
            async (id:number) => {
                return await getCourseModules(id);
            },
            {
                fulfilled: (state, action) => {
                    state.course = action.payload;
                },
            }
        )
    }),
    selectors: {
        selectCourses: (courses) => courses.courses,
        selectCourse: (courses) => courses.course,
    },
});

export const { getCoursesData, delCourseData, addCourse, updateCourse, getCourseByIdData } = courseSlice.actions;
export const { selectCourses, selectCourse } = courseSlice.selectors;
