"use client";
import { delModuleData, getModulesData, selectModule } from "@/lib/features/modules/modulesSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IModule } from "@/lib/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Modules() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const modules = useAppSelector(selectModule);
    const pathname = usePathname();

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getModulesData()))
            .catch((err) => router.push("/"));
    }, []);

    const delGroup = async (id: number) => {
        await dispatch(delModuleData(+id));
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {modules.map((elm: IModule) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>{elm.course.name}</td>
                            <td>
                                <button onClick={() => delGroup(elm.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <Link
                                    className={` ${pathname === "/courses"}`}
                                    href="/profile/admin/courses"
                                >
                                    Update
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Modules;
