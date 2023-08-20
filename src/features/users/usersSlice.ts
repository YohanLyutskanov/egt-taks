import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../../common/data-types/user";
import axios from "axios";
import {notify} from "../../common/utils/notify";

interface UserState {
    users: User[];
    status: string;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    status: "",
    error: null
};

export const fetchUsers = createAsyncThunk(
    "users/fetch",
    async (thunkAPI) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    },
);

export const UsersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        editUser: (state: UserState, action: PayloadAction<User>) => {
            const userToEdit = action.payload;

            const index = state.users.findIndex(user => user.id === userToEdit.id);

            if (index !== -1) {
                state.users[index] = userToEdit;
                notify("success", `User ${userToEdit.name} was edited successfully!`);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state: any, action) => {
                state.status = "pending";
            })
            .addCase(fetchUsers.fulfilled, (state: any, action) => {
                state.users = action.payload;
                state.status = "success";
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state: any, action) => {
                state.status = "failed";
                state.error = "Failed to fetch users"
            });
    },
});

export const {editUser} = UsersSlice.actions;
export default UsersSlice.reducer;
