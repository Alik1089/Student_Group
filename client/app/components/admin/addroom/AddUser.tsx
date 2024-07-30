"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { AddUserSchema } from "./adduserSchema";
import {
    addUser,
    profileUser,
} from "@/lib/features/user/userSlice";
import { IAddUser, IGroup, IUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import { getGroupsData, selectGroup } from "@/lib/features/groups/groupsSlice";

function AddUser() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const groups = useAppSelector(selectGroup);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getGroupsData()))
            .catch((err) => router.push("/"));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            age: 0,
            email: "",
            password: "",
            role: 5,
            phoneNumber: "",
            salary: 0,
            groupId: 0,
        },
        validationSchema: AddUserSchema,
        onSubmit: (obj: IAddUser) => {
            dispatch(addUser(obj)).unwrap().then().catch();
        },
    });
    return (
        <div>
            <div>AddUser</div>
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
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.surname}
                    />
                    {formik.touched.surname && formik.errors.surname ? (
                        <div>{formik.errors.surname}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="age">Age</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                    />
                    {formik.touched.age && formik.errors.age ? (
                        <div>{formik.errors.age}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className="col-md-5 mb-3">
                    <label htmlFor="role">Role</label>
                    <select
                        className="custom-select d-block w-100"
                        id="role"
                        name="role"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.role}
                    >
                        <option value={5} hidden>Roles</option>
                        <option value={0}>Student...</option>
                        <option value={1}>Teacher...</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <div>{formik.errors.role}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div>{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>

                <div>
                    {formik.values.role == 0 ? (
                        <>
                            <div className="col-md-5 mb-3">
                                <label htmlFor="groupId">Group Id</label>
                                <select
                                    className="custom-select d-block w-100"
                                    id="groupId"
                                    name="groupId"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.groupId}
                                >
                                    {groups.map((elm: IGroup, i: number) => (
                                        <option key={i} value={elm.id}>
                                            {elm.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.groupId &&
                                formik.errors.groupId ? (
                                    <div>{formik.errors.groupId}</div>
                                ) : null}
                            </div>
                        </>
                    ) : formik.values.role == 1 ? (
                        <>
                            <div>
                                <label htmlFor="salary">salary</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.salary}
                                />
                                {formik.touched.salary &&
                                formik.errors.salary ? (
                                    <div>{formik.errors.salary}</div>
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddUser;
