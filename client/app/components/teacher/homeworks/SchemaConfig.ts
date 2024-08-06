import * as Yup from "yup";

export const SearchGroupsSchema = Yup.object().shape({
    groupId: Yup.number().required(),
})

export const SearchModulesSchema = Yup.object().shape({
    moduleId: Yup.number().required(),
})

export const AddHomeworkSchema = Yup.object().shape({
    name: Yup.string().required(),
    groupId: Yup.number().required(),
    moduleId: Yup.number().required(),
    description: Yup.string().required(),
})