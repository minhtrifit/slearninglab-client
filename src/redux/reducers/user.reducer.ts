import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserAccountType, ConfirmEmailType } from "../../types/user.type";

// Interface declair
interface UserState {
  id: string;
  username: string;
  name: string;
  email: string;
  roles: string[];
  isLoading: boolean;
  code: string;
  checkCode: string;
}

// InitialState value
const initialState: UserState = {
  id: "",
  username: "",
  name: "",
  email: "",
  roles: [],
  isLoading: false,
  code: "",
  checkCode: "",
};

// createAsyncThunk middleware
export const registerAccount = createAsyncThunk(
  "user/register_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (account: UserAccountType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          //   signal: thunkAPI.signal,
          body: account,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //   if (error.name === "AxiosError") {
      //     return thunkAPI.rejectWithValue({ message: "Register account failed" });
      //   }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const confirmEmailRegister = createAsyncThunk(
  "user/confirm_email_register",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (emailCode: ConfirmEmailType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verifyEmail`,
        {
          body: emailCode,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({ message: "Confirm email failed" });
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
      if (action.payload) {
        state.code = action.payload.code;
        state.checkCode = action.payload.checkCode;
      }

      state.isLoading = false;
    })
    .addCase(registerAccount.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(confirmEmailRegister.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(confirmEmailRegister.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
        sessionStorage.setItem("register_account", "true");
        window.location.reload();
      }
      state.isLoading = false;
    })
    .addCase(confirmEmailRegister.rejected, (state) => {
      state.isLoading = false;
    });
});

export default userReducer;
