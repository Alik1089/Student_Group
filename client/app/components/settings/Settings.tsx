"use client";
import {
    changeNameSurnameData,
    changePasswordData,
    changePictureData,
    getUserData,
    getUsersData,
    profileUser,
    selectUser,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { changeNameSurnameSchema, changePassword } from "./settingsSchemas";
import {
    IUpdateImage,
    IUpdateNameSurname,
    IUpdatePassword,
} from "@/lib/types/updates";
import UploadFile from "./UploadFile";

function Settings() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then((res) => dispatch(getUserData(res.id)))
            .catch((err) => router.push("/"));
    }, []);

    console.log(user);

    const changeNameSurnameFormik = useFormik({
        initialValues: {
            name: "",
            surname: "",
        },
        validationSchema: changeNameSurnameSchema,
        onSubmit: (obj: IUpdateNameSurname) => {
            console.log(obj);
            dispatch(changeNameSurnameData({ id: user.id, obj }));
        },
    });

    const changePasswordFormik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: changePassword,
        onSubmit: (obj: IUpdatePassword) => {
            dispatch(changePasswordData({ id: user.id, obj }));
        },
    });

    const MAX_SIZE = 500000;
    const validateImage = (values: { image?: File }) => {
        if (values.image && values.image.size > MAX_SIZE) {
            return { image: "Max file size exceeded." };
        }
    };

    const [img, setimg] = useState<any>();

    return (
        <>
            <div>
                <h3>Update youre Name & Surname</h3>
                <form onSubmit={changeNameSurnameFormik.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={changeNameSurnameFormik.handleChange}
                            onBlur={changeNameSurnameFormik.handleBlur}
                            value={changeNameSurnameFormik.values.name}
                        />
                        {changeNameSurnameFormik.touched.name &&
                        changeNameSurnameFormik.errors.name ? (
                            <div>{changeNameSurnameFormik.errors.name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            onChange={changeNameSurnameFormik.handleChange}
                            onBlur={changeNameSurnameFormik.handleBlur}
                            value={changeNameSurnameFormik.values.surname}
                        />
                        {changeNameSurnameFormik.touched.surname &&
                        changeNameSurnameFormik.errors.surname ? (
                            <div>{changeNameSurnameFormik.errors.surname}</div>
                        ) : null}
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>

            <div>
                <h3>Update youre Password</h3>
                <form onSubmit={changePasswordFormik.handleSubmit}>
                    <div>
                        <label htmlFor="name">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            onChange={changePasswordFormik.handleChange}
                            onBlur={changePasswordFormik.handleBlur}
                            value={changePasswordFormik.values.oldPassword}
                        />
                        {changePasswordFormik.touched.oldPassword &&
                        changePasswordFormik.errors.oldPassword ? (
                            <div>{changePasswordFormik.errors.oldPassword}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            onChange={changePasswordFormik.handleChange}
                            onBlur={changePasswordFormik.handleBlur}
                            value={changePasswordFormik.values.newPassword}
                        />
                        {changePasswordFormik.touched.newPassword &&
                        changePasswordFormik.errors.newPassword ? (
                            <div>{changePasswordFormik.errors.newPassword}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Repeat Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={changePasswordFormik.handleChange}
                            onBlur={changePasswordFormik.handleBlur}
                            value={changePasswordFormik.values.confirmPassword}
                        />
                        {changePasswordFormik.touched.confirmPassword &&
                        changePasswordFormik.errors.confirmPassword ? (
                            <div>
                                {changePasswordFormik.errors.confirmPassword}
                            </div>
                        ) : null}
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
            <div>
                <h3>Update youre Image</h3>
                <div>
                    <input type="file" id="image" name="image"  onChange={(e)=>{
                      if(e.target.files?.length)
                      setimg(e.target.files[0])}}/>
                </div>

                <button type="submit" disabled={!img?true:false} onClick={()=>{
                  console.log(img, user.id)
                  if(img){
                    const form = new FormData();
                    form.append("file", img);
                    dispatch(changePictureData( {id:user.id, obj:form}))
                    .unwrap()
                    .then(console.log)
                    .catch(console.warn)
                  }
                }}>Update</button>
            </div>
        </>
    );
}

export default Settings;
