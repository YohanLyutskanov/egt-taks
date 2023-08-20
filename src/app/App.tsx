import React, {useEffect} from "react"
import {Route, Routes} from "react-router-dom";
import {Users} from "../features/users/Users";
import {MainNavigation} from "../common/components/MainNavigation";
import {UserPosts} from "../features/user-posts/UserPosts";
import {useAppDispatch} from "./store";
import {fetchUsers} from "../features/users/usersSlice";
import {ToastContainer} from 'react-toastify';
import {Tasks} from "../features/tasks/Tasks";
import {fetchTasks} from "../features/tasks/tasksSlice";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchTasks());
    }, [dispatch]);
    return (
        <>
            <MainNavigation/>
            <Routes>
                <Route path={"/"} element={<Users/>}/>
                <Route path="/user/:userId" element={<UserPosts/>}/>
                <Route path="/tasks" element={<Tasks/>}/>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
