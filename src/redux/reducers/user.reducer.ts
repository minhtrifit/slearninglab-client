import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  UserAccountType,
  ConfirmEmailType,
  LoginAccountType,
} from "../../types/user.type";

import { logoutAccount } from "../actions/user.action";

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
  accessToken: string;
  refreshToken: string;
  isLogin: boolean;
  findUser: any | null;
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
  accessToken: "",
  refreshToken: "",
  isLogin: false,
  findUser: null,
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

export const handleAccessToken = createAsyncThunk(
  "user/handle_access_token",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      if (accessToken) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            // data
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return response.data;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginAccount = createAsyncThunk(
  "user/login_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (account: LoginAccountType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          body: account,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "exam/get_user_profile",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (username: string | undefined, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            username: username,
          },
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
    })
    .addCase(loginAccount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginAccount.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);

        state.id = action.payload.id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.roles = action.payload.roles;

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
        sessionStorage.setItem(
          "refreshToken",
          JSON.stringify(action.payload.refreshToken)
        );

        state.isLogin = true;
      }
      state.isLoading = false;
    })
    .addCase(loginAccount.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(handleAccessToken.fulfilled, (state, action) => {
      if (action.payload && action.payload?.message === "Access token valid") {
        // console.log(action.payload);

        state.id = action.payload.data.id;
        state.email = action.payload.data.email;
        state.username = action.payload.data.username;
        state.name = action.payload.data.name;
        state.roles = action.payload.data.roles;

        const accessToken: any = sessionStorage
          .getItem("accessToken")
          ?.toString()
          .replace(/^"(.*)"$/, "$1");

        const refreshToken: any = sessionStorage
          .getItem("refreshToken")
          ?.toString()
          .replace(/^"(.*)"$/, "$1");

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        state.isLogin = true;
      }
    })
    .addCase(logoutAccount, () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      window.location.reload();
    })
    .addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.findUser = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getUserProfile.rejected, (state) => {
      state.isLoading = false;
    });
});

export default userReducer;
