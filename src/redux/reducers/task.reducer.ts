import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../types/task.type";

// Interface declair
interface TaskState {
  taskList: Task[];
  isSaving: boolean;
}

// InitialState value
const initialState: TaskState = {
  taskList: [
    {
      id: "1",
      columnId: "todo",
      content: "Tham gia lớp teacher1",
    },
    {
      id: "2",
      columnId: "doing",
      content: "Trò chuyện với các thành viên lớp teacher1",
    },
    {
      id: "3",
      columnId: "doing",
      content: "Làm test 1",
    },
    {
      id: "4",
      columnId: "done",
      content: "Làm test 3",
    },
  ],
  isSaving: false,
};

// createAsyncThunk middleware
export const updateTaskList = createAsyncThunk(
  "task/update_task_list",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (data: { taskList: Task[]; username: string }, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/task/updateTaskList`,
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

export const getTaskByUsername = createAsyncThunk(
  "task/get_task_by_username",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (username: string | undefined, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/task/getTaskByUsername`,
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

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateTaskList.pending, (state) => {
      state.isSaving = true;
    })
    .addCase(updateTaskList.fulfilled, (state) => {
      state.isSaving = false;
    })
    .addCase(updateTaskList.rejected, (state) => {
      state.isSaving = false;
    });
});

export default taskReducer;
