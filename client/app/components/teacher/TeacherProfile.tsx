"use client"
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function TeacherProfile() {
    const dispatch = useAppDispatch();
    const router = useRouter()

    useEffect(() => {
        dispatch(profileUser())
        .unwrap()
        .then()
        .catch( (err) => router.push("/"));
    },[])

  return (
    <div>TeacherProfile</div>
  )
}

export default TeacherProfile