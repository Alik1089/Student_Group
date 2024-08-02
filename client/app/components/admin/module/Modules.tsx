"use client";
import {
    delModuleData,
    getModulesData,
    selectModules,
} from "@/lib/features/modules/modulesSlice";
import { profileUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IModule } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ModuleModal from "./ModuleModal";

function Modules() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const modules = useAppSelector(selectModules);
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [moduleIdex, setModuleId] = useState(0);



    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then(() => dispatch(getModulesData()))
            .catch((err) => router.push("/"));
    }, []);

    const delModule = async (id: number) => {
        await dispatch(delModuleData(+id));
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {modules.map((elm: IModule) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>{elm.course.name}</td>
                            <td>
                                <button onClick={() => delModule(elm.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        setModuleId(elm.id);
                                        setIsOpen(true);
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <ModuleModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    moduleId={moduleIdex}
                />
            </div>
        </>
    );
}

export default Modules;
