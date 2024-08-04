"use client";
import {
    logoutUser,
    profileUser,
    selectStatus,
    selectUser,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
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
    const [bool, setBool] = useState<boolean>(false)

    useEffect(() => {
        dispatch(profileUser()).unwrap().then().catch(console.warn);
    }, [bool]);

    const logout = () => {
        Cookies.remove("token");
        logoutUser()
        setBool(!bool)
        router.push("/")
    }

    return (
        <>
            {
                status ?
                    <h1>Loding...</h1>
                    :
                    <nav className={styles.nav}>
                        {user.role || user.role == 0 ? (
                            <>
                                <Link
                                    className={` ${pathname === "/profile" ? styles.active : ""
                                        }`}
                                    href="/profile"
                                >
                                    Profile
                                </Link>
                                {user.role == 2 ? (
                                    <>
                                        <Link className={` ${pathname === "/users" ? styles.active : ""}`} href="/profile/admin/users">
                                            Users
                                        </Link>
                                        <Link className={` ${pathname === "/adduser" ? styles.active : ""}`} href="/profile/admin/adduser">
                                            Add user
                                        </Link>

                                        <Link className={` ${pathname === "/courses" ? styles.active : ""}`} href="/profile/admin/courses">
                                            Courses
                                        </Link>
                                        <Link className={` ${pathname === "/addcourse" ? styles.active : ""}`} href="/profile/admin/addcourse">
                                            Add course
                                        </Link>

                                        <Link className={` ${pathname === "/groups" ? styles.active : ""}`} href="/profile/admin/group">
                                            Groups
                                        </Link>
                                        <Link className={` ${pathname === "/addgroup" ? styles.active : ""}`} href="/profile/admin/addgroup">
                                            Add group
                                        </Link>

                                        <Link className={` ${pathname === "/modules" ? styles.active : ""}`} href="/profile/admin/modules">
                                            Modules
                                        </Link>
                                        <Link className={` ${pathname === "/addmodule" ? styles.active : ""}`} href="/profile/admin/addmodule"
                                        >
                                            Add module
                                        </Link>
                                    </>
                                ) : user.role == 1 ? (
                                    <>
                                        <Link className={` ${pathname === "/homework" ? styles.active : ""}`} href="/profile/teacher/homework">
                                            My students
                                        </Link>
                                    </>
                                ) : user.role == 0 ? (
                                    <>
                                        
                                    </>
                                ) : (
                                    <></>
                                )}

                                <Link className={` ${pathname === "/settings" ? styles.active : ""}`} href="/profile/settings">
                                    Settings
                                </Link>

                                <button onClick={logout} >Log Out</button>
                            </>
                        ) : (
                            <Link
                                className={` ${pathname === "/login" ? styles.active : ""}`}
                                href="/login"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
            }

        </>
    );
};
