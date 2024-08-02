import "./CourseModal.scss";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { profileUser } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { UpdateCourseSchema } from "./updateCourseSchema";
import { IUpdateCourse } from "@/lib/types/updates";
import {
    getCourseByIdData,
    selectCourse,
    updateCourse,
} from "@/lib/features/courses/courseSlice";
import { ICourseModal, IModule } from "@/lib/types";

const CourseModal = ({ isOpen, closeModal, courseId }: ICourseModal) => {
    const modalRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const course = useAppSelector(selectCourse);

    useEffect(() => {
        dispatch(profileUser()).unwrap().then().catch((err) => router.push("/"));
        dispatch(getCourseByIdData(courseId));
    }, [courseId]);

    const handleCloseModal = () => {
        closeModal();
    };

    const handleClickOutside = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const formik = useFormik({
        initialValues: {
            name: "",
            duration: 0,
        },
        validationSchema: UpdateCourseSchema,
        onSubmit: (obj: IUpdateCourse) => {
            dispatch(updateCourse({ id: courseId, obj }))
                .unwrap()
                .then()
                .catch();
        },
    });

    return (
        <>
            <div className={`modal ${isOpen ? "open" : ""}`}>
                <div className="modal-content" ref={modalRef}>
                    <span className="close" onClick={handleCloseModal}>
                        &times;
                    </span>
                    <div>
                        <p>Modules</p>
                        <ul>
                            {course?.module?.map((elm: IModule) => (
                                <li key={elm.id}>{elm.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div>Update Course</div>
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
                                {formik.touched.duration &&
                                formik.errors.duration ? (
                                    <div>{formik.errors.duration}</div>
                                ) : null}
                            </div>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseModal;
