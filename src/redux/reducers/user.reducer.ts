import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserAccountType } from "../../types/user.type";

// Interface declair
interface UserState {
  id: string;
  username: string;
  name: string;
  email: string;
  roles: string[];
  isLoading: boolean;
}

// InitialState value
const initialState: UserState = {
  id: "",
  username: "",
  name: "",
  email: "",
  roles: [],
  isLoading: false,
};

// createAsyncThunk middleware
export const registerAccount = createAsyncThunk(
  "user/register_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Dùng dấu _ cho các API không có params
  async (account: UserAccountType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          //   signal: thunkAPI.signal,
          body: account,
        }
      );

      console.log(response);

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({ message: "Register account failed" });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerAccount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerAccount.fulfilled, (state, action) => {
      const userRegisterData = action.payload;
      console.log(userRegisterData);
      state.isLoading = false;
    })
    .addCase(registerAccount.rejected, (state) => {
      state.isLoading = false;
    });
});

export default userReducer;
