import {Task} from "../../../common/data-types/task";
import {Button, Tag} from "antd";
import {toggleTaskCompletion} from "../tasksSlice";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../../app/store";
import {User} from "../../../common/data-types/user";
import {NoData} from "../../../common/components/common/NoData";

type TaskTableProps = {
    filteredTasks: Task[];
    users: User[];
}

const TASKS_PER_PAGE = 10;

export const TaskTable = (props: TaskTableProps) => {
    const {filteredTasks, users} = props

    const [currentPage, setCurrentPage] = useState<number>(1);

    const dispatch = useAppDispatch();

    const usersMap = users.reduce((acc: any, user: User) => {
        acc[user.id] = user.name;
        return acc;
    }, {});

    //Pagination logic
    const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
    const startIdx = (currentPage - 1) * TASKS_PER_PAGE;
    const endIdx = startIdx + TASKS_PER_PAGE;
    const currentData = filteredTasks.slice(startIdx, endIdx);

    useEffect(() => {
        if (currentPage > totalPages && totalPages !== 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredTasks.length]);

    return (<>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>User</th>
                <th>Completed</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {currentData.map((item: Task) => (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{usersMap[item.userId] || 'Unknown'}</td>
                    <td>
                        <Tag color={item.completed ? "green" : "volcano"}>
                            {item.completed ? "Completed" : "Not Completed"}
                        </Tag>
                    </td>
                    <td>
                        <Button onClick={() => dispatch(toggleTaskCompletion(item))}>
                            Toggle Completion
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        {
            filteredTasks.length > TASKS_PER_PAGE &&
            (<div className={"pagination-wrapper"}>
                <button className={"tasks-button"} disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}>Previous
                </button>
                <span className={"pagination-text"}>Page {currentPage} of {totalPages}</span>
                <button className={"tasks-button"} disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}>Next
                </button>
            </div>)
        }
        {!currentData.length && <NoData/>}
    </>)
}