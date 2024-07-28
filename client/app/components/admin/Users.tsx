"use client"
import { getUsersApi } from '@/lib/features/user/userApi';
import { getUsersData, profileUser, selectUsers } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Users() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const users = useAppSelector(selectUsers);

    console.log(users);
    
    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(dispatch(getUsersApi()))
            .catch((err) => router.push("/"));
    }, [])

    return <>
        <table>
            <thead>
                <tr>   </tr>
            </thead>
        </table>
    </>
}

export default Users