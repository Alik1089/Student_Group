"use client";
import {
    getGroupsByTeacherId,
    selectGroups,
} from "@/lib/features/groups/groupsSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IGroup, IHomework, IModule, INewModule, ISearchGroup, ISearchModule } from "@/lib/types";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchGroupsSchema, SearchModulesSchema, } from "./SearchStudentsSchema";
import { getModulesByGroupIdData, selectModules } from "@/lib/features/modules/modulesSlice";
import { getHomeworkBYgroupIdData, selectHomeworks } from "@/lib/features/homeworks/homeworkSlice";

function Homeworks() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const groups = useAppSelector(selectGroups);
    const modules = useAppSelector(selectModules)
    const homeworks = useAppSelector(selectHomeworks)
    const [groupId, setGroupId] = useState<number>(0)
    const [group, setGroup] = useState<IGroup[]>([])


    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then((res) =>
                dispatch(getGroupsByTeacherId(res.id)))
            .catch((err) => router.push("/"));
    }, []);


    const groupsFormik = useFormik({
        initialValues: {
            groupId: 0
        },
        validationSchema: SearchGroupsSchema,
        onSubmit: (obj: ISearchGroup) => {
            console.log(obj);
            setGroupId(+obj.groupId)
            dispatch(getModulesByGroupIdData(+obj.groupId))
        },
    });

    const modulesFormik = useFormik({
        initialValues: {
            moduleId: 0
        },
        validationSchema: SearchModulesSchema,
        onSubmit: (obj: ISearchModule) => {
            const moduleId = +obj.moduleId
            const groupex = groups.filter((elm:IGroup) => elm.id == groupId)
            setGroup(groupex)
            dispatch(getHomeworkBYgroupIdData({ groupId, moduleId }))
        },
    });
    console.log(homeworks);
    console.log(groups);
    console.log(group)
    



    return (
        <>
            <h1>Information about students</h1>
            <div>
                <form onSubmit={groupsFormik.handleSubmit}>
                    <>
                        <div className="col-md-5 mb-3">
                            <select
                                className="custom-select d-block w-100"
                                id="groupId"
                                name="groupId"
                                onChange={groupsFormik.handleChange}
                                onBlur={groupsFormik.handleBlur}
                                value={groupsFormik.values.groupId}
                            >
                                <option value="" hidden> Groups ... </option>
                                {groups.map((elm: IGroup, i: number) => (
                                    <option key={i} value={elm.id}>
                                        {elm.name}
                                    </option>
                                ))}
                            </select>
                            {groupsFormik.touched.groupId &&
                                groupsFormik.errors.groupId ? (
                                <div>{groupsFormik.errors.groupId}</div>
                            ) : null}
                        </div>
                    </>
                    <button type="submit">Choose</button>
                </form>
            </div>

            <div>
                {modules.length ? (
                    <>
                        <form onSubmit={modulesFormik.handleSubmit}>
                            <>
                                <div className="col-md-5 mb-3">
                                    <select
                                        className="custom-select d-block w-100"
                                        id="moduleId"
                                        name="moduleId"
                                        onChange={modulesFormik.handleChange}
                                        onBlur={modulesFormik.handleBlur}
                                        value={modulesFormik.values.moduleId}
                                    >
                                        <option value="" hidden>Modules ... </option>
                                        {modules.map((elm: INewModule) => <option key={elm.model.id} value={elm.model.id}>
                                            {elm.model.name}
                                        </option>)}
                                    </select>
                                    {modulesFormik.touched.moduleId &&
                                        modulesFormik.errors.moduleId ? (
                                        <div>{modulesFormik.errors.moduleId}</div>
                                    ) : null}
                                </div>
                            </>
                            <button type="submit">Choose</button>
                        </form>
                    </>
                ) : (
                    <>
                    </>
                )}

                {homeworks.length ? (<>
                    <table style={{
                        width: "300px",
                        border: "1px solid black"
                    }}>
                        <thead>
                            <tr >
                                <th style={{
                                    width: "50px",
                                    border: "1px solid red"
                                }}></th>
                                {homeworks.map((elm: IHomework) => <th style={{
                                    border: "1px solid black"
                                }} key={elm.id}>
                                    {elm.id}
                                </th>)}
                            </tr>
                        </thead>
                    </table>
                </>) : !homeworks.length ? (<>
                </>) : (
                    <></>
                )}
            </div>

        </>
    );
}

export default Homeworks;
