"use client";
import {
    getGroupsByTeacherId,
    selectGroups,
} from "@/lib/features/groups/groupsSlice";
import {
    getStudetsByGroupData,
    profileUser,
    selectStudents,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    IGroup,
    IHomework,
    IModule,
    INewModule,
    IRate,
    ISearchGroup,
    ISearchModule,
    IStudent,
} from "@/lib/types";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    AddHomeworkSchema,
    SearchGroupsSchema,
    SearchModulesSchema,
} from "./SchemaConfig";
import {
    getModulesByGroupIdData,
    selectModules,
} from "@/lib/features/modules/modulesSlice";
import {
    addHomeworkData,
    getHomeworkBYgroupIdData,
    getHomeworkBYIdData,
    selectHomework,
    selectHomeworks,
} from "@/lib/features/homeworks/homeworkSlice";
import { getRatesData, selectRates } from "@/lib/features/rates/ratesSlice";
import { boolean } from "yup";
import { IAddHomework } from "@/lib/types/adds";
import RatesModal from "./RatesChangeModal";

function Homeworks() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const groups = useAppSelector(selectGroups);
    const modules = useAppSelector(selectModules);
    const homeworks = useAppSelector(selectHomeworks);
    const students = useAppSelector(selectStudents);
    const rates = useAppSelector(selectRates);
    const homework = useAppSelector(selectHomework);

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [groupId, setGroupId] = useState<number>(0);
    const [moduleId, setModuleId] = useState<number>(0);
    const [studentId, setStudentId] = useState<number>(0);
    const [homeworkId, setHomeworkId] = useState<number>(0);
    const [grate, setGrate] = useState<number>(0)
    const [group, setGroup] = useState<IGroup[]>([]);
    const [seeRate, setSeeRate] = useState<boolean>(false);
    const [seeHomework, setSeeHomework] = useState<boolean>(false);
    const [seeAddHomework, setSeeAddHomework] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
        dispatch(profileUser())
            .unwrap()
            .then((res) => {
                dispatch(getGroupsByTeacherId(res.id)).unwrap().then();
            })
            .catch((err) => router.push("/"));
        dispatch(getRatesData());
    }, []);

    const groupsFormik = useFormik({
        initialValues: {
            groupId: 0,
        },
        validationSchema: SearchGroupsSchema,
        onSubmit: (obj: ISearchGroup) => {
            setGroupId(+obj.groupId);
            dispatch(getModulesByGroupIdData(+obj.groupId));
            dispatch(getStudetsByGroupData(+obj.groupId));
        },
    });

    const modulesFormik = useFormik({
        initialValues: {
            moduleId: 0,
        },
        validationSchema: SearchModulesSchema,
        onSubmit: (obj: ISearchModule) => {
            setModuleId(+obj.moduleId);
            const groupex = groups.filter((elm: IGroup) => elm.id == groupId);
            setGroup(groupex);
            dispatch(
                getHomeworkBYgroupIdData({ groupId, moduleId: +obj.moduleId })
            );
        },
    });

    const updateFormik = useFormik({
        initialValues: {
            name: "",
            groupId: 0,
            moduleId: 0,
            description: "",
        },
        validationSchema: AddHomeworkSchema,
        onSubmit: (obj: IAddHomework) => {
            obj.groupId = groupId;
            obj.moduleId = moduleId;
            dispatch(addHomeworkData(obj)).unwrap().then(console.log);
        },
    });

    const ratingSee = (hId: number, sId: number): any => {
        const x = rates.find(
            (elm: IRate) => elm.studentId == sId && elm.homeworkId == hId
        );
        return x ? x.rate : "-";
    };

    const showRates = () => {
        setSeeRate(!seeRate);
    };

    const showHomework = () => {
        setSeeHomework(!seeHomework);
    };

    const showAddHomework = () => {
        setSeeAddHomework(!seeAddHomework);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
console.log(homeworks);

    return (
        <>
            <h1>Information about students</h1>

            <div>
                {group.length ? (
                    <>
                        <button onClick={() => showAddHomework()}>
                            Add Homework
                        </button>
                        <button onClick={() => showRates()}>See Rates</button>
                        <button onClick={() => showHomework()}>
                            Show Homeworks
                        </button>
                    </>
                ) : (
                    <></>
                )}
            </div>

            <div>
                <form onSubmit={groupsFormik.handleSubmit}>
                    <>
                        <div className="col-md-5 mb-3">
                            <select
                                className="custom-select d-block w-100"
                                id="groupId"
                                name="groupId"
                                onChange={groupsFormik.handleChange}
                                onBlur={groupsFormik.handleBlur}
                                value={groupsFormik.values.groupId}
                            >
                                <option value="" hidden>
                                    {" "}
                                    Groups ...{" "}
                                </option>
                                {groups.map((elm: IGroup, i: number) => (
                                    <option key={i} value={elm.id}>
                                        {elm.name}
                                    </option>
                                ))}
                            </select>
                            {groupsFormik.touched.groupId &&
                            groupsFormik.errors.groupId ? (
                                <div>{groupsFormik.errors.groupId}</div>
                            ) : null}
                        </div>
                    </>
                    <button type="submit">Choose</button>
                </form>
            </div>

            <div>
                {modules.length ? (
                    <>
                        <form onSubmit={modulesFormik.handleSubmit}>
                            <>
                                <div className="col-md-5 mb-3">
                                    <select
                                        className="custom-select d-block w-100"
                                        id="moduleId"
                                        name="moduleId"
                                        onChange={modulesFormik.handleChange}
                                        onBlur={modulesFormik.handleBlur}
                                        value={modulesFormik.values.moduleId}
                                    >
                                        <option value="" hidden>
                                            Modules ...{" "}
                                        </option>
                                        {modules.map((elm: INewModule) => (
                                            <option
                                                key={elm.model.id}
                                                value={elm.model.id}
                                            >
                                                {elm.model.name}
                                            </option>
                                        ))}
                                    </select>
                                    {modulesFormik.touched.moduleId &&
                                    modulesFormik.errors.moduleId ? (
                                        <div>
                                            {modulesFormik.errors.moduleId}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                            <button type="submit">Choose</button>
                        </form>
                    </>
                ) : (
                    <></>
                )}
            </div>

            <div>
                {seeRate ? (
                    <>
                        <table border={2}>
                            <thead>
                                <tr>
                                    <th>
                                        HM
                                        <br></br>
                                        St
                                    </th>
                                    {arr.map((elm, index) => {
                                        return <th key={index}>{elm}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((elm1: IStudent, i: number) => (
                                    <tr key={i}>
                                        <td>
                                            {elm1.user.name} {elm1.user.surname}
                                        </td>
                                        {homeworks.map((elm2) => (
                                            <td
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setStudentId(+elm1.userId)
                                                    setHomeworkId(+elm2.id)
                                                    setGrate(ratingSee( elm2.id,elm1.userId))
                                                }}
                                            >
                                                {ratingSee(
                                                    elm2.id,
                                                    elm1.userId
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <></>
                )}
            </div>

            <div>
                {seeHomework ? (
                    <>
                        <select
                            onChange={(e) => {
                                if (e.target.value)
                                    dispatch(
                                        getHomeworkBYIdData(+e.target.value)
                                    )
                                        .unwrap()
                                        .then();
                            }}
                        >
                            <option value={""} disabled selected>
                                Homeworks ...{" "}
                            </option>
                            {homeworks.map((elm: IHomework, i: number) => (
                                <option key={i} value={elm.id}>
                                    {elm.name}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <></>
                )}
            </div>

            {seeAddHomework ? (
                <>
                    <div>
                        <h3>Add new homework</h3>
                        <form onSubmit={updateFormik.handleSubmit}>
                            <>
                                <div>
                                    {/* <label htmlFor="name">Name</label> */}
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={updateFormik.handleChange}
                                        onBlur={updateFormik.handleBlur}
                                        value={updateFormik.values.name}
                                    />
                                    {updateFormik.touched.name &&
                                    updateFormik.errors.name ? (
                                        <div>{updateFormik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div>
                                    {/* <label htmlFor="description">Description</label> */}
                                    <textarea
                                        id="description"
                                        name="description"
                                        onChange={updateFormik.handleChange}
                                        onBlur={updateFormik.handleBlur}
                                        value={updateFormik.values.description}
                                    />
                                    {updateFormik.touched.description &&
                                    updateFormik.errors.description ? (
                                        <div>
                                            {updateFormik.errors.description}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </>
            ) : (
                <></>
            )}

            {homework.id && seeHomework ? (
                <>
                    <p>
                        <span>Name: </span>
                        {homework.name}
                    </p>
                    <p>
                        <span>Description: </span>
                        {homework.description}
                    </p>
                </>
            ) : (
                <></>
            )}

            <div>
                <RatesModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    studentId={studentId}
                    homeworkId={homeworkId}
                    grate={grate}
                />
            </div>
        </>
    );
}

export default Homeworks;
