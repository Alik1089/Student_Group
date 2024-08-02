import * as Yup from "yup";

export const UpdateGroupSchema = Yup.object().shape({
    name: Yup.string(),
    count:Yup.number(),
})