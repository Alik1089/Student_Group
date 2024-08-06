"use client";
import "./RatesChangeModal.scss";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { IRatesModal } from "@/lib/types";
import {
    getHomeworkBYIdData,
    selectHomework,
} from "@/lib/features/homeworks/homeworkSlice";
import {
    getStudentsByIdData,
    selectStudent,
} from "@/lib/features/user/userSlice";
import { delRateData, getRatesData } from "@/lib/features/rates/ratesSlice";

const RatesModal = ({
    isOpen,
    closeModal,
    studentId,
    homeworkId,
    grate,
}: IRatesModal) => {
    const modalRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const homework = useAppSelector(selectHomework);
    const student = useAppSelector(selectStudent);
    const [update, setUpdate] = useState<boolean>(false)
    const [x, setX] = useState<string>(grate + "");

    console.log(studentId, homeworkId, grate, x);
    const handleCloseModal = () => {
        closeModal();
    };
    useEffect(() => {
        dispatch(getHomeworkBYIdData(+homeworkId));
        dispatch(getStudentsByIdData(studentId));
    }, [homeworkId, studentId]);
    useEffect(() => {
        setX(grate + "");
    }, [grate]);

    const handleClickOutside = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const delGrate = () => {
        console.log(homeworkId, studentId);
        dispatch(delRateData({ homeworkId, studentId }))
            .unwrap()
            .then((e) => {
                if (e) {
                    setX("-");
                    dispatch(getRatesData());
                }
            });
    };

    const updateGrate = () => {
        setUpdate(!update)
    };

    return (
        <>
            <div className={`modal ${isOpen ? "open" : ""}`}>
                <div className="modal-content" ref={modalRef}>
                    <span className="close" onClick={handleCloseModal}>
                        &times;
                    </span>
                    <h4>Homework</h4>
                    <p>{homework.name}</p>
                    <h4>Student</h4>
                    <p>
                        {student.user?.name} {student.user?.surname}
                    </p>
                    <h4>Grate</h4>
                    <p>{x}</p>
                    <button onClick={() => delGrate()}>Delete grate</button>
                    <button
                        onClick={() => {
                            updateGrate();
                        }}
                    >
                        Update grate
                    </button>
                </div>
            </div>
        </>
    );
};

export default RatesModal;
