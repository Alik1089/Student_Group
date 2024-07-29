import * as Yup from "yup";

export const AddUserSchema = Yup.object().shape({
    name: Yup.string().required(),
    surname: Yup.string().required(),
    age: Yup.number().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    role: Yup.number().required(),
    phoneNumber: Yup.string().required(),
    salary: Yup.number(),
    groupId: Yup.number(),
})