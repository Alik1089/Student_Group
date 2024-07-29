import * as Yup from "yup";

export const AddCourseSchema = Yup.object().shape({
    name: Yup.string().required(),
    duration:Yup.number().required()
})