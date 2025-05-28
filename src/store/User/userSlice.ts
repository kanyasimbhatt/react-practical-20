import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../Types/UserType";
import { MainInstance } from "../../Services/axiosInstance";
import type { Product } from "../../Types/ProductType";
import { useQuery } from "@tanstack/react-query";

type UserStore = {
  users: User[];
  userId: string;
  error: boolean;
  isLoading: boolean;
};

type RecievedUser = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  favorites: Product[];
};

const initialValue: UserStore = {
  users: [],
  userId: "",
  error: false,
  isLoading: false,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (userId: string | undefined = undefined) => {
    try {
      if (userId) {
        const response = await MainInstance.get(`/users/${userId}`);
        return response.data;
      }
      const response = await MainInstance.get("/users");
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (data: RecievedUser) => {
    try {
      const id = crypto.randomUUID();
      const dataToStore = { ...data, id };
      localStorage.setItem("user-id", id);
      const response = await MainInstance.post("/users", dataToStore);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const UserSlice = createSlice({
  name: "userSlice",
  initialState: initialValue,
  reducers: {
    loginUser: (state, action) => {
      const userData = state.users.find(
        (user: User) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (!userData) {
        state.error = true;
      } else {
        state.error = false;
        localStorage.setItem("user-id", userData.id);
      }
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.userId = action.payload.id;
      });
  },
});

export const useAddUser = () => {
  return useQuery({
    queryKey: ["add-user"],
  });
};

export const { loginUser } = UserSlice.actions;

export default UserSlice.reducer;
