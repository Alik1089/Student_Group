import * as Yup from "yup";

export const AddModuleSchema = Yup.object().shape({
    name: Yup.string().required(),
    courseId:Yup.number().required()
})