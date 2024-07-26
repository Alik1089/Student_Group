"use client";
import { useAppDispatch } from "@/lib/hooks";
import React from "react";
import "./Login.scss";
import { LoginSchema } from "./loginSchema";
import { Formik, Form, Field, useFormik } from "formik";
import { ILogin } from "@/lib/types";
import { loginUser, profileUser } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useRouter();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values))
                .unwrap()
                .then((res) => {
                    console.log(res);
                    Cookies.set("token", res.access_token);
                    dispatch(profileUser())
                    if (res.role == 0) {
                        navigate.push("/profile/student");
                    } else if (res.role == 1) {
                        navigate.push("/profile/teacher");
                    } else if (res.role == 2) {
                        navigate.push("/profile/admin");
                    }else{
                        navigate.push("/profile");
                    }
                })
                .catch((err) => {
                    formik.setErrors({
                        password: "Wrong Username and/or Password",
                    });
                });
        },
    });

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">UserName</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div>{formik.errors.username}</div>
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

                <button type="submit" >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;
