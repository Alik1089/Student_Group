"use client"
import { profileUser, selectUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Profile() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const user = useAppSelector(selectUser)
    console.log(user);
    

    useEffect(() => {
        dispatch(profileUser())
        .unwrap()
        .then()
        .catch( (err) => router.push("/login"));
    },[])

  return (
    <div>Profile


      <div>
        <img src={"http://localhost:8080/"+user.image} alt="" />
      </div>
    </div>
  )
}

export default Profile