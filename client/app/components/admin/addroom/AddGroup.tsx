"use client"
import { profileUser } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { IAddGroup } from '@/lib/types';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { AddGroupSchema } from './addgroupSchema';

function AddGroup() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then()
            .catch((err) => router.push("/"));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            teacherId:0,
            count:0,
            moduleId:0
        },
        validationSchema: AddGroupSchema,
        onSubmit: (obj: IAddGroup) => {
            // dispatch(addCourse(obj)).unwrap().then().catch();
        },
    });
    return (
        <div>
            <div>Add Course</div>
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

                
                <div className="col-md-5 mb-3">
                    <label htmlFor="teacherId">Role</label>
                    <select
                        className="custom-select d-block w-100"
                        id="teacherId"
                        name="teacherId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.teacherId}
                    >
                        <option value={5} selected disabled>Roles</option>
                        <option value={0}>Student...</option>
                        <option value={1}>Teacher...</option>
                    </select>
                    {formik.touched.teacherId && formik.errors.teacherId ? (
                        <div>{formik.errors.teacherId}</div>
                    ) : null}
                </div>

                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddGroup