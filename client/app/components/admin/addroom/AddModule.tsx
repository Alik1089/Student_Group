"use client";
import {
    getCourseData,
    selectCourse,
} from "@/lib/features/courses/courseSlice";
import { addModule } from "@/lib/features/modules/modulesSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IAddModule, ICourse } from "@/lib/types";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AddModuleSchema } from "./addmoduleSchema";

function AddModule() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const courses = useAppSelector(selectCourse);


    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then()
            .catch((err) => router.push("/"));
        dispatch(getCourseData()).unwrap()
        .then()
        .catch()
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            courseId: 0,
        },
        validationSchema: AddModuleSchema,
        onSubmit: (obj: IAddModule) => {
            console.log(obj);
            dispatch(addModule(obj)).unwrap().then().catch();
        },
    });
    return (
        <div>
            <div>Add Module</div>
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
                    <label htmlFor="courseId">Course </label>
                    <select
                        className="custom-select d-block w-100"
                        id="courseId"
                        name="courseId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.courseId}
                    >
                        {courses.map((elm: ICourse, i: number) => (
                            <option key={i} value={elm.id}>
                                {elm.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.courseId && formik.errors.courseId ? (
                        <div>{formik.errors.courseId}</div>
                    ) : null}
                </div>

                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddModule;
