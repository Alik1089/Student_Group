"use client";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { AddUserSchema } from "./adduserSchema";
import { addUser, profileUser } from "@/lib/features/user/userSlice";
import { IUser } from "@/lib/types";
import { useRouter } from "next/navigation";

function AddUser() {
    const dispatch = useAppDispatch();
    const router = useRouter()

    useEffect(() => {
        dispatch(profileUser())
        .unwrap()
        .then()
        .catch( (err) => router.push("/"));
    },[])

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            age: 0,
            email: "",
            password: "",
            role: 0,
            phoneNumber: "",
        },
        validationSchema: AddUserSchema,
        onSubmit: (obj: IUser) => {
            dispatch(addUser(obj)).unwrap().then().catch();
        },
    });
    return (
        <>
            <div>AddUser</div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        defaultValue={""}
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
                        defaultValue={""}
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
                        defaultValue={0}
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
                        defaultValue={""}
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
                        defaultValue={""}
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
                        defaultValue={0}
                        id="role"
                        name="role"
                        value={formik.values.role}
                    >
                        <option value={1}>Student...</option>
                        <option value={2}>Teacher...</option>
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
                        defaultValue={""}
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div>{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AddUser;
