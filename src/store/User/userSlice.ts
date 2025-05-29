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

export const fetchUsers = async (userId: string = "") => {
  try {
    if (userId) {
      const response = await MainInstance.get(`/users/${userId}`);
      return response.data;
    }
    const response = await MainInstance.get("/users");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

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
        console.log(state.error);
      } else {
        state.error = false;
        localStorage.setItem("user-id", userData.id);
      }
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
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

export const { loginUser, setUsers } = UserSlice.actions;

export default UserSlice.reducer;
