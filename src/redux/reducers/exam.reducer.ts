import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { ExamType, ExamInfo } from "../../types/exam.type";
import axios from "axios";

// Interface declair
interface ExamState {
  isCreating: boolean;
  isLoading: boolean;
  examList: ExamInfo[];
}

// InitialState value
const initialState: ExamState = {
  isCreating: false,
  isLoading: false,
  examList: [],
};

// createAsyncThunk middleware
export const createExam = createAsyncThunk(
  "exam/create_exam",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (exam: ExamType, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/exam/createExam`,
        {
          body: exam,
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

export const getExamByClassId = createAsyncThunk(
  "class/get_exam_by_class_id",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (classId: string | undefined, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exam/getExamByClassId`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            classId: classId,
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

const examReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createExam.pending, (state) => {
      state.isCreating = true;
    })
    .addCase(createExam.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isCreating = false;
    })
    .addCase(createExam.rejected, (state) => {
      state.isCreating = false;
    })
    .addCase(getExamByClassId.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getExamByClassId.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log(action.payload);
        state.examList = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getExamByClassId.rejected, (state) => {
      state.isLoading = false;
    });
});

export default examReducer;
