"use client"
import { addGroup, } from '@/lib/features/groups/groupsSlice';
import { getModulesData, selectModule } from '@/lib/features/modules/modulesSlice';
import { getTeacherData, profileUser, selectTeachers } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { IAddGroup, IModule, ITeacher } from '@/lib/types';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { AddGroupSchema } from './addgroupSchema';

function AddGroup() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const teachers = useAppSelector(selectTeachers)
    const modules = useAppSelector(selectModule)

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then()
            .catch((err) => router.push("/"));
        dispatch(getTeacherData())
        dispatch(getModulesData())
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            count:0,
            teacherId:0,
            moduleId:0
        },
        validationSchema: AddGroupSchema,
        onSubmit: (obj: IAddGroup) => {
            dispatch(addGroup(obj)).unwrap().then().catch();
        },
    });
    return (
        <div>
            <div>Add Group</div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="count">Count</label>
                    <input
                        type="text"
                        id="count"
                        name="count"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.count}
                    />
                    {formik.touched.count && formik.errors.count ? (
                        <div>{formik.errors.count}</div>
                    ) : null}
                </div>

                
                <div className="col-md-5 mb-3">
                    <label htmlFor="teacherId">Teacher</label>
                    <select
                        className="custom-select d-block w-100"
                        id="teacherId"
                        name="teacherId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.teacherId}
                    >
                        {teachers.map((elm:ITeacher) => <option key={elm.userId} value={elm.userId}>{elm.user.name}</option>)}
                    </select>
                    {formik.touched.teacherId && formik.errors.teacherId ? (
                        <div>{formik.errors.teacherId}</div>
                    ) : null}
                </div>

                <div className="col-md-5 mb-3">
                    <label htmlFor="moduleId">Module</label>
                    <select
                        className="custom-select d-block w-100"
                        id="moduleId"
                        name="moduleId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moduleId}
                    >
                        {modules.map((elm:IModule) => <option key={elm.id} value={elm.id}>{elm.name}</option>)}
                    </select>
                    {formik.touched.moduleId && formik.errors.moduleId ? (
                        <div>{formik.errors.moduleId}</div>
                    ) : null}
                </div>

                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddGroup