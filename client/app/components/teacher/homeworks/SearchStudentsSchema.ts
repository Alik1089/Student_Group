import * as Yup from "yup";

export const SearchGroupsSchema = Yup.object().shape({
    groupId: Yup.number().required(),
})

export const SearchModulesSchema = Yup.object().shape({
    moduleId: Yup.number().required(),
})