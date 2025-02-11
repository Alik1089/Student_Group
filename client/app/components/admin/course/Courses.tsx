"use client";
import {
    delCourseData,
    getCoursesData,
    selectCourses,
} from "@/lib/features/courses/courseSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ICourse } from "@/lib/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseModal from "./CourseModal";

function Courses() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const courses = useAppSelector(selectCourses);
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [courseIdex, setJobId] = useState(0);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getCoursesData()))
            .catch((err) => router.push("/"));
    }, []);

    const delCourse = async (id: number) => {
        await dispatch(delCourseData(+id));
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
        <h1>Courses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Delete</th>
                        <th>See more</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((elm: ICourse) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>{elm.duration}</td>
                            <td>
                                <button onClick={() => delCourse(elm.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                            <button
                                    onClick={() => {
                                        setJobId(elm.id);
                                        setIsOpen(true);
                                    }}
                                >
                                    See more
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <CourseModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    courseId={courseIdex}
                />
            </div>
        </>
    );
}

export default Courses;
