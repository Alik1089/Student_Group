"use client"
import { delGroupData, getGroupsData, selectGroup } from "@/lib/features/groups/groupsSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IGroup } from "@/lib/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Groups() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const groups = useAppSelector(selectGroup);
    const pathname = usePathname();
    console.log(groups);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getGroupsData()))
            .catch((err) => router.push("/"));
    }, []);

    const delGroup = async (id: number) => {
        await dispatch(delGroupData(+id));
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Teacher</th>
                        <th>Count</th>
                        <th>Module</th>
                        <th>Delete</th>
                        <th>See more</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((elm: IGroup) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>{elm.teacher.user.name}</td>
                            <td>{elm.count}</td>
                            <td>{elm.module.name}</td>
                            <td>
                                <button onClick={() => delGroup(elm.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <Link
                                    className={` ${
                                        pathname === "/courses"
                                    }`}
                                    href="/profile/admin/courses"
                                >
                                    See more
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Groups