import {User} from "../../../common/data-types/user";
import {useEffect, useState} from "react";
import {FilterProps} from "../Tasks";

type TasksFilterProps = {
    setFilters: (filters: FilterProps) => void;
    users: User[];
}

export const TasksFilter = ({users, setFilters}: TasksFilterProps) => {
    const [title, setTitle] = useState<string>('');
    const [completed, setCompleted] = useState<string>('all');
    const [userId, setUserId] = useState<string>('all');

    useEffect(() => {
        handleFilterChange()
    }, [title, userId, completed])

    const handleFilterChange = () => {
        setFilters({
            title: title ? title : undefined,
            completed: completed !== 'all' ? completed === 'true' : undefined,
            userId: userId !== 'all' ? parseInt(userId) : undefined
        });
    };

    const clearFilters = () => {
        setTitle("")
        setCompleted("all")
        setUserId("all")
    };

    return (
        <div className={"filter-wrapper"}>
            <input
                placeholder="Filter by title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
            >
                <option value="all">All</option>
                <option value="true">Completed</option>
                <option value="false">Not Completed</option>
            </select>
            <select
                value={userId}
                onChange={(e) => {
                    setUserId(e.target.value);
                }}
            >
                <option value="all">All Users</option>
                {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <button className={"tasks-button"} onClick={clearFilters}>Clear Filters</button>
        </div>
    );
};
