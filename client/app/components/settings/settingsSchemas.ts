import * as Yup from "yup";

export const changeNameSurnameSchema = Yup.object().shape({
    name: Yup.string().required(),
    surname: Yup.string().required(),
})

export const changePassword = Yup.object().shape({
    oldPassword: Yup.string().min(5).max(16).required(),
    newPassword: Yup.string().min(5).max(16).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Must match "password" field value'),
})

export const updatePicture = Yup.object({
    image: Yup.string().required()
})