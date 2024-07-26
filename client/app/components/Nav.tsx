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

export const Nav = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const status = useAppSelector(selectStatus);
    console.log(user, status);

    useEffect(() => {
        dispatch(profileUser()).unwrap().then(res=>{
            console.log("res",res);
        }).catch(console.warn);
    }, []);

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
                            <span>admin</span>
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

                    <button>Log Out</button>
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
