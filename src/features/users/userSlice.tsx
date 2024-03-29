import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersState } from "../../app/types";

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

// Асинхронный экшен для загрузки пользователей
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://randomuser.me/api/?results=40");

  console.log(JSON.stringify(response.data));
  return response.data.results.map((user: any) => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
    dob: { date: user.dob.date, age: user.dob.age },
    address: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
    picture: user.picture.large,
    gender: user.gender,
  }));
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { removeUser } = usersSlice.actions;

export default usersSlice.reducer;
