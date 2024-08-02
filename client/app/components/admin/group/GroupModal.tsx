"use client";
import "./GroupModal.scss";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    getTeacherData,
    profileUser,
    selectTeachers,
} from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { IGroup, IGroupModal, IModule, IStudent, ITeacher } from "@/lib/types";
import {
    delStudentGroup,
    getGroupByIdData,
    getGroupsData,
    selectGroup,
    updateGroupData,
} from "@/lib/features/groups/groupsSlice";
import { getGroupByIdApi } from "@/lib/features/groups/groupsApi";
import { UpdateGroupSchema } from "./updateGroupSchema";
import { IUpdateGroup } from "@/lib/types/updates";
import {
    getModulesData,
    selectModules,
} from "@/lib/features/modules/modulesSlice";

const GroupModal = ({ isOpen, closeModal, groupId }: IGroupModal) => {
    const modalRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const group = useAppSelector(selectGroup);
    const teachers = useAppSelector(selectTeachers);
    const modules = useAppSelector(selectModules);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then()
            .catch((err) => router.push("/"));
        dispatch(getGroupByIdData(groupId));
        dispatch(getTeacherData());
        dispatch(getModulesData());
    }, [groupId]);


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
            count: 0,
        },
        validationSchema: UpdateGroupSchema,
        onSubmit: (obj: IUpdateGroup) => {
            dispatch(updateGroupData({ id: groupId, obj }))
                .unwrap()
                .then()
                .catch();
        },
    });

    const delStudentGroupops = async (id: number) => {
        dispatch(delStudentGroup(id))
            .unwrap()
            .then(() => {
                dispatch(getGroupByIdData(groupId));
                dispatch(getGroupsData());
            });
    };

    return (
        <>
            <div className={`modal ${isOpen ? "open" : ""}`}>
                <div className="modal-content" ref={modalRef}>
                    <span className="close" onClick={handleCloseModal}>
                        &times;
                    </span>
                    <div className="grid">
                        <div>
                            <h3>Group</h3>
                            <p>{group?.name}</p>
                            <p>{group?.count}</p>
                            <div className="grid">
                                <div>
                                    <h5>Module</h5>
                                    <p>{group?.module?.name}</p>
                                </div>
                                <div>
                                    <div className="col-md-5 mb-3">
                                        <select
                                            className="custom-select d-block w-100"
                                            onChange={(e) => {
                                                dispatch(
                                                    updateGroupData({
                                                        id: groupId,
                                                        obj: {
                                                            moduleId:
                                                                +e.target.value,
                                                        },
                                                    })
                                                )
                                                    .unwrap()
                                                    .then()
                                                    .catch();
                                            }}
                                        >
                                            <option value={-1} hidden>
                                                Modules ...
                                            </option>
                                            {modules.map((elm: IModule) => (
                                                <option
                                                    key={elm.id}
                                                    value={elm.id}
                                                >
                                                    {elm.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Teacher</h3>
                            <div className="grid">
                                <div>
                                    <p>
                                        {group?.teacher?.user?.name}{" "}
                                        {group?.teacher?.user?.surname}
                                    </p>
                                </div>
                                <div>
                                    <div className="col-md-5 mb-3">
                                        <select
                                            className="custom-select d-block w-100"
                                            onChange={(e) => {
                                                dispatch(
                                                    updateGroupData({
                                                        id: groupId,
                                                        obj: {
                                                            teacherId:
                                                                +e.target.value,
                                                        },
                                                    })
                                                )
                                                    .unwrap()
                                                    .then()
                                                    .catch();
                                            }}
                                        >
                                            <option value={-1} hidden>
                                                Teachers ...
                                            </option>
                                            {teachers.map((elm: ITeacher) => (
                                                <option
                                                    key={elm.userId}
                                                    value={elm.userId}
                                                >
                                                    {elm.user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <h5>Students</h5>
                            {group?.student?.map((elm: IStudent) => (
                                <p>
                                    {elm.user.name} {elm.user.surname}
                                    ---{" "}
                                    <button
                                        onClick={() =>
                                            delStudentGroupops(elm.userId)
                                        }
                                    >
                                        x
                                    </button>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4>Update group</h4>
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
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupModal;
