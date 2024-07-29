"use client";
import {
    profileUser,
    selectStatus,
    selectUser,
    selectUsers,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IUser } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/layout.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Nav = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter()

    const user = useAppSelector(selectUser);
    const status = useAppSelector(selectStatus);

    useEffect(() => {
        dispatch(profileUser()).unwrap().then().catch(console.warn);
    }, []);

    const logout = () => {
        Cookies.remove("token");
        router.push("/")
    }

    return (
        <>
        {
            status?
            <h1>Loding...</h1>
            :
            <nav className={styles.nav}>
            { user.role || user.role==0 ? (
                <>
                    <Link
                        className={` ${
                            pathname === "/profile" ? styles.active : ""
                        }`}
                        href="/profile"
                    >
                        Profile 
                    </Link>
                    { user.role == 2 ? (
                        <>
                            <Link
                                className={` ${
                                    pathname === "/adduser" ? styles.active : ""
                                }`}
                                href="/profile/admin/adduser"
                            >
                                Add user
                            </Link>
                            <Link
                                className={` ${
                                    pathname === "/users" ? styles.active : ""
                                }`}
                                href="/profile/admin/users"
                            >
                                Users
                            </Link>
                            <Link
                                className={` ${
                                    pathname === "/addcourse" ? styles.active : ""
                                }`}
                                href="/profile/admin/addcourse"
                            >
                                Add course
                            </Link>
                            <Link
                                className={` ${
                                    pathname === "/addgroup" ? styles.active : ""
                                }`}
                                href="/profile/admin/addgroup"
                            >
                                Add group
                            </Link>
                            <Link
                                className={` ${
                                    pathname === "/addmodule" ? styles.active : ""
                                }`}
                                href="/profile/admin/addmodule"
                            >
                                Add module
                            </Link>
                        </>    
                    ) : user.role == 1 ? (
                        <>
                            <span>teacher</span>
                        </>
                    ) : user.role == 0 ? (
                        <>
                            <span>student</span>
                        </>
                    ) : (
                        <></>
                    )}

                    <button onClick = {logout} >Log Out</button>
                </>
            ) : (
                <Link
                    className={` ${pathname === "/" ? styles.active : ""}`}
                    href="/"
                >
                    Login
                </Link>
            )}
        </nav> 
        }
        
        </>
    );
};
