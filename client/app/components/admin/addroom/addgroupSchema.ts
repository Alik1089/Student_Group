import * as Yup from "yup";

export const AddGroupSchema = Yup.object().shape({
    name: Yup.string().required(),
    teacherId:Yup.number().required(),
    count:Yup.number().required(),
    moduleId:Yup.number().required(),
})