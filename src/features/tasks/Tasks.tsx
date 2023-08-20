import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../app/store";
import {Task} from "../../common/data-types/task";
import "./styles/tasks.css"
import {TasksFilter} from "./components/TasksFilter";
import {TaskTable} from "./components/TaskTable";
import {notify} from "../../common/utils/notify";
import {Loader} from "../../common/components/common/Loader";

export type FilterProps = { title?: string, completed?: boolean, userId?: number }

export const Tasks = () => {
    const tasks = useAppSelector((state) => state.task.tasks);
    const users = useAppSelector((state) => state.user.users);
    const status = useAppSelector((state) => state.task.status);
    const error = useAppSelector((state) => state.task.error);

    useEffect(() => {
        if (status === "failed" && error) {
            notify("error", error)
        }
    }, [status, error])

    //Filter logic
    const [filters, setFilters] = useState<FilterProps>({});
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    useEffect(() => {
        handleFilterChange()
    }, [tasks, filters])

    const handleFilterChange = () => {
        let newFilteredTasks = [...tasks];
        if (filters.title) {
            newFilteredTasks = newFilteredTasks.filter(task => task.title.includes(filters.title!));
        }
        if (typeof filters.completed !== 'undefined') {
            newFilteredTasks = newFilteredTasks.filter(task => task.completed === filters.completed);
        }
        if (filters.userId) {
            newFilteredTasks = newFilteredTasks.filter(task => task.userId === filters.userId);
        }
        setFilteredTasks(newFilteredTasks);
    };

    if (status === "pending") return <Loader/>

    return (
        <div className={"table-wrapper main-wrapper"}>
            <TasksFilter users={users} setFilters={setFilters}/>
            <TaskTable filteredTasks={filteredTasks} users={users}/>
        </div>
    );
}