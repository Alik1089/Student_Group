import * as Yup from "yup";

export const UpdateCourseSchema = Yup.object().shape({
    name: Yup.string().required(),
    duration:Yup.number().required()
})