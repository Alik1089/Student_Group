"use client";
import {
    getHomeworksData,
    selectHomeworks,
} from "@/lib/features/homeworks/homeworkSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IHomework } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HomeworkModal from "./HomeworkModal";

function Homeworks() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const homeworks = useAppSelector(selectHomeworks);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [homeworkIdex, setHomeworkId] = useState(0);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getHomeworksData()))
            .catch((err) => router.push("/"));
    }, []);

    console.log(homeworks);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Group</th>
                        <th>Module</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody>
                    {homeworks.map((elm: IHomework) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>{elm.group.name}</td>
                            <td>{elm.model.name}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setHomeworkId(elm.id);
                                        setIsOpen(true);
                                    }}
                                >
                                    See More
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Homeworks;
