import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { updateChatList } from "../actions/class.action";

import { ClassroomType } from "../../types/class.type";
import { Message } from "../../types/chat.type";

// Interface declair
interface ClassState {
  isLoading: boolean;
  isGettingClass: boolean;
  isGettingJoined: boolean;
  teacherClassList: ClassroomType[];
  studentClassList: ClassroomType[];
  studentJoinedList: ClassroomType[];
  detailClass: ClassroomType | null;
  messageList: Message[] | undefined;
}

// InitialState value
const initialState: ClassState = {
  isLoading: false,
  isGettingClass: false,
  isGettingJoined: false,
  teacherClassList: [],
  studentClassList: [],
  studentJoinedList: [],
  detailClass: null,
  messageList: [],
};

// createAsyncThunk middleware
export const createClassroom = createAsyncThunk(
  "class/create_classroom",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (classroom: ClassroomType, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/classroom/create`,
        {
          body: classroom,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

export const getClassByUsername = createAsyncThunk(
  "class/get_class_by_username",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (username: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/classroom/getClassByUsername`,
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

export const getClassInfoById = createAsyncThunk(
  "class/get_class_info_by_id",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (data: { id: string | undefined; username: string }, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/classroom/getClassInfoById`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            id: data.id,
            username: data.username,
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

export const getClassJoinedByUsername = createAsyncThunk(
  "class/get_class_joined_by_username",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (username: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/classroom/getClassJoinedByUsername`,
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

export const getAllClasses = createAsyncThunk(
  "class/get_all_classes",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/classroom/getAllClasses`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

export const getClassCanJoinByUsername = createAsyncThunk(
  "class/get_class_can_join_by_username",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (username: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/classroom/getClassCanJoinByUsername`,
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

export const acceptJoinClass = createAsyncThunk(
  "class/accept_join_class",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (
    data: { classId: string; userJoinedId: string; dateJoined: Date },
    thunkAPI
  ) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/classroom/acceptJoinClass`,
        {
          body: data,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

const classReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createClassroom.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createClassroom.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(createClassroom.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getClassByUsername.pending, (state) => {
      state.isGettingClass = true;
    })
    .addCase(getClassByUsername.fulfilled, (state, action) => {
      state.teacherClassList = action.payload;
      state.isGettingClass = false;
    })
    .addCase(getClassByUsername.rejected, (state) => {
      state.isGettingClass = false;
    })
    .addCase(getClassInfoById.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        state.detailClass = action.payload;
      }
    })
    .addCase(getAllClasses.pending, (state) => {
      state.isGettingClass = true;
    })
    .addCase(getAllClasses.fulfilled, (state, action) => {
      if (action.payload) {
        state.studentClassList = action.payload;
      }
      state.isGettingClass = false;
    })
    .addCase(getAllClasses.rejected, (state) => {
      state.isGettingClass = false;
    })
    .addCase(getClassJoinedByUsername.pending, (state) => {
      state.isGettingJoined = true;
    })
    .addCase(getClassJoinedByUsername.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log(action.payload);
        state.studentJoinedList = action.payload;
      }
      state.isGettingJoined = false;
    })
    .addCase(getClassJoinedByUsername.rejected, (state) => {
      state.isGettingJoined = false;
    })
    .addCase(getClassCanJoinByUsername.fulfilled, (state, action) => {
      if (action.payload) {
        state.studentClassList = action.payload;
      }
      state.isGettingClass = false;
    })
    .addCase(updateChatList, (state, action: any) => {
      // console.log(action.payload);
      if (
        typeof action.payload === "object" &&
        !Array.isArray(action.payload) &&
        action.payload !== null
      ) {
        state.messageList?.push(action.payload);
      } else {
        state.messageList = action.payload;
      }
    });
});

export default classReducer;
