import "./CourseModal.scss";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { profileUser } from "@/lib/features/user/userSlice";

const CourseModal = ({ isOpen, closeModal, courseId }: any) => {
    const modalRef = useRef<any>(null);
    const [rate, setRate] = useState<number>(0);
    const [text, setText] = useState<string>("");
    const dispatch = useAppDispatch();
    console.log(courseId);

    useEffect(() => {
        dispatch(profileUser()).unwrap().then().catch(console.warn);
    }, []);

    const handleCloseModal = () => {
        closeModal();
    };

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

    const ratingChanged = (newRating: any) => {
        setRate(newRating);
    };

    const sendMessage = () => {
        // const obj = {rate:rate, text:text, jobId:jobId, freelancerUserId:freelancerUserId, userId:user.id}
        // dispatch(postFeedBack(obj))
        // .unwrap()
        // .then(console.log )
    };

    return (
        <>
            <div className={`modal ${isOpen ? "open" : ""}`}>
                <div className="modal-content" ref={modalRef}>
                    <span className="close" onClick={handleCloseModal}>
                        &times;
                    </span>
                    <p>Hello modal</p>
                </div>
            </div>
        </>
    );
};

export default CourseModal;
