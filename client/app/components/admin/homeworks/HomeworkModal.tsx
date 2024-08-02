"use client";

import React, { useEffect, useRef } from "react";
import {
    getHomeworkBYgroupIdData,
    getHomeworkBYIdData,
    selectHomeworks,
} from "@/lib/features/homeworks/homeworkSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IHomework, IHomewrorkModal } from "@/lib/types";
import { useRouter } from "next/navigation";
import "./homeworkModal.scss";

const HomeworkModal = ({
    isOpen1,
    closeModal,
    groupId,
    moduleId,
}: IHomewrorkModal) => {
    const modalRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const homeworks = useAppSelector(selectHomeworks)

    useEffect(() => {
        if (groupId && moduleId)
            dispatch(profileUser())
                .unwrap()
                .then()
                .catch((err) => router.push("/"));
        dispatch(getHomeworkBYgroupIdData({ groupId, moduleId }));
    }, [groupId, moduleId]);

    const handleCloseModal = () => {
        closeModal();
    };

    const handleClickOutside = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    React.useEffect(() => {
        if (isOpen1) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen1]);

    return (
        <>
            {isOpen1 ? (
                <div className={`modal open`}>
                    <div className="modal-content" ref={modalRef}>
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        {homeworks.length ? (
                            <>
                            <h1>Module name ({homeworks[0].model.name})</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {homeworks?.map((elm: IHomework) => (
                                            <tr key={elm.id}>
                                                <td>{elm.name}</td>
                                                <td>{elm.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <h1>No have data</h1>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default HomeworkModal;
