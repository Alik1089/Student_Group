"use client";
import {
    getGroupsByTeacherId,
    selectGroups,
} from "@/lib/features/groups/groupsSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IGroup, IHomework } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Homeworks() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const groups = useAppSelector(selectGroups);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then((res) => dispatch(getGroupsByTeacherId(res.id)))
            .catch((err) => router.push("/"));
    }, []);

    console.log(groups);

    const search = (id:number) => {
        console.log(id);
    }

    return (
        <>
            <h1>Information about students</h1>
            <select 
                onChange={(e) => search(+e.target.value)}
            >
                <option value="" hidden>...</option>
                {groups.map((elm: IGroup) => (
                    <option value={elm.id} key={elm.id}>
                        {elm.name}
                    </option>
                ))} 
            </select>
        </>
    );
}

export default Homeworks;
