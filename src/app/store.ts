import UsersSlice from "../features/users/usersSlice";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import TasksSlice from "../features/tasks/tasksSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        user: UsersSlice,
        task: TasksSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),

});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector