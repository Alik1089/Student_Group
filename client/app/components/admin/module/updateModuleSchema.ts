import * as Yup from "yup";

export const UpdateModuleSchema = Yup.object().shape({
    name: Yup.string(),
    courseId:Yup.number(),
})