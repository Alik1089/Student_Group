import { IModule, IAddCourse, ICourse } from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";
import { addCourseApi, delCourseApi, getCourseApi } from "./courseApi";

export interface CourseSliceState {
    course: ICourse[];
}

const initialState: CourseSliceState = {
    course: [],
};

export const courseSlice = createAppSlice({
    name: "course",
    initialState,
    reducers: (create) => ({
        getCourseData: create.asyncThunk(
            async () => {
                return await getCourseApi();
            },
            {
                fulfilled: (state, action) => {
                    state.course = action.payload;
                },
            }
        ),

        delCourseData: create.asyncThunk(
            async (id: number) => {
                return await delCourseApi(+id);
            },
            {
                fulfilled: (state, action) => {
                    state.course = action.payload;
                },
            }
        ),
        addCourse: create.asyncThunk(
            async (obj: IAddCourse) => {
                return await addCourseApi(obj);
            },
            {
                fulfilled: (state, action) => {
                    state.course = action.payload;
                },
            }
        ),
    }),
    selectors: {
        selectCourse: (course) => course.course,
    },
});

export const { getCourseData, delCourseData, addCourse } =
    courseSlice.actions;
export const { selectCourse } = courseSlice.selectors;
