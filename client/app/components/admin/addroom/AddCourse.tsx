"use client"
import { addCourse } from '@/lib/features/courses/courseSlice';
import { profileUser } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { IAddCourse } from '@/lib/types';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { AddCourseSchema } from './addcourseSchema';

function AddCourse() {
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
            duration:0
        },
        validationSchema: AddCourseSchema,
        onSubmit: (obj: IAddCourse) => {
            dispatch(addCourse(obj)).unwrap().then().catch();
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

                <div>
                    <label htmlFor="duration">Duration</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.duration}
                    />
                    {formik.touched.duration && formik.errors.duration ? (
                        <div>{formik.errors.duration}</div>
                    ) : null}
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddCourse