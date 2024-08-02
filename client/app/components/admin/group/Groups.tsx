"use client";
import {
    delGroupData,
    getGroupsData,
    selectGroups,
} from "@/lib/features/groups/groupsSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IGroup } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HomeworkModal from "../homeworks/HomeworkModal";
import GroupModal from "./GroupModal";

function Groups() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const groups = useAppSelector(selectGroups);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpen1, setIsOpen1] = useState<boolean>(false);
    const [groupIdex, setGroupId] = useState(0);
    const [moduleIdex, setmoduleIdex] = useState(0);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getGroupsData()))
            .catch((err) => router.push("/"));
    }, []);

    const delGroup = async (id: number) => {
        await dispatch(delGroupData(+id));
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const closeModal1 = () => {
        setIsOpen1(false);
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
                        <th>See homework</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((elm: IGroup) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>
                                {elm.teacher.user.name}{" "}
                                {elm.teacher.user.surname}
                            </td>
                            <td>{elm.count}</td>
                            <td>{elm.module.name}</td>
                            <td>
                                <button onClick={() => delGroup(elm.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        setGroupId(elm.id);
                                        setIsOpen(true);
                                    }}
                                >
                                    See more
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        setGroupId(elm.id);
                                        setmoduleIdex(elm.module.id);
                                        setIsOpen1(true);
                                    }}
                                >
                                    See homeworks
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <GroupModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    groupId={groupIdex}
                />
            </div>
            <div>
                <HomeworkModal
                    isOpen1={isOpen1}
                    closeModal={closeModal1}
                    groupId={groupIdex}
                    moduleId={moduleIdex}
                />
            </div>
        </>
    );
}

export default Groups;
