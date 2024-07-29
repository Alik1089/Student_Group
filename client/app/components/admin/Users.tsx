"use client";
import { getUsersApi } from "@/lib/features/user/userApi";
import {
    delUserData,
    getUsersData,
    profileUser,
    selectUsers,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Users() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    let users = useAppSelector(selectUsers);
    console.log(users);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getUsersData()))
            .catch((err) => router.push("/"));
    }, []);

    const delUser = async (id:number) => {
        await dispatch(delUserData(+id))
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Phone Number</th>
                        <th>Other</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((elm: IUser) => {
                        return (
                            <>
                                {elm.role != 2 ? (
                                    <>
                                        <tr key={elm.id}>
                                            <td>{elm.name}</td>
                                            <td>{elm.surname}</td>
                                            <td>{elm.age}</td>
                                            <td>{elm.email}</td>
                                            {elm.role == 1 ? (
                                                <td>Teacher</td>
                                            ) : elm.role == 0 ? (
                                                <td>Student</td>
                                            ) : (
                                                <></>
                                            )}
                                            <td>{elm.phoneNumber}</td>
                                            {elm.role == 1 ? (
                                                <td>{elm.teacher.salary}$</td>
                                            ) : elm.role == 0 ? (
                                                <td>{elm.student.group.name}</td>
                                            ) : (
                                                <></>
                                            )}
                                            <td>
                                                <button onClick={() => delUser(elm.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Users;
