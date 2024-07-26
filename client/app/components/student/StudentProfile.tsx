"use client"
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


function StudentProfile() {
    const dispatch = useAppDispatch();
    const router = useRouter()

    useEffect(() => {
        dispatch(profileUser())
        .unwrap()
        .then()
        .catch( (err) => router.push("/login"));
    },[])

    return <div>StudentProfile</div>;
}

export default StudentProfile;
