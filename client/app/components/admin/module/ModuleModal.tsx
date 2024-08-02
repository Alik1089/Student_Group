import {
    getCoursesData,
    selectCourses,
} from "@/lib/features/courses/courseSlice";
import { updateModuleByIdApi } from "@/lib/features/modules/modulesApi";
import {
    getModuleByIdData,
    getModulesData,
    selectModule,
    updateModuleData,
} from "@/lib/features/modules/modulesSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ICourse, IModuleModal } from "@/lib/types";
import { IUpdateModule } from "@/lib/types/updates";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { UpdateModuleSchema } from "./updateModuleSchema";
import "./moduleModal.scss";


const ModuleModal = ({ isOpen, closeModal, moduleId }: IModuleModal) => {
    const modalRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const courses = useAppSelector(selectCourses);
    const module = useAppSelector(selectModule);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then()
            .catch((err) => router.push("/"));
        dispatch(getCoursesData());
        dispatch(getModuleByIdData(moduleId));
    }, [moduleId]);

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
            courseId: -1,
        },
        validationSchema: UpdateModuleSchema,
        onSubmit: (obj: IUpdateModule) => {
            console.log(moduleId, obj);
            dispatch(updateModuleData({ id: moduleId, obj }))
                .unwrap()
                .then()
                .catch();
        },
    });

    return (
        <>
            {isOpen ? (
                <div className={`modal open`}>
                    <div className="modal-content" ref={modalRef}>
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h1>{module.name}</h1>
                        <div>
                            <h4>Update Module</h4>
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
                                    {formik.touched.name &&
                                    formik.errors.name ? (
                                        <div>{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-5 mb-3">
                                    <select
                                        id="courseId"
                                        name="courseId"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.courseId}
                                    >
                                        <option value={-1} hidden>
                                            Courses...
                                        </option>
                                        {courses.map((elm: ICourse) => (
                                            <option value={elm.id}>
                                                {elm.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ModuleModal;
