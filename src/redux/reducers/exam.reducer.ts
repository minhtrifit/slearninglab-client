import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { ExamType, ExamInfo, ExamTypeNonAns } from "../../types/exam.type";
import axios from "axios";

import { findExam } from "../actions/exam.action";

// Interface declair
interface ExamState {
  isCreating: boolean;
  isLoading: boolean;
  examList: ExamInfo[];
  detailExam: ExamType | undefined;
  findExamList: ExamInfo[];
  detailExamNonAns: ExamTypeNonAns | undefined;
  isSubmitting: boolean;
}

// InitialState value
const initialState: ExamState = {
  isCreating: false,
  isLoading: false,
  examList: [],
  detailExam: undefined,
  findExamList: [],
  detailExamNonAns: undefined,
  isSubmitting: false,
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
  "exam/get_exam_by_class_id",
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

export const getDetailExamById = createAsyncThunk(
  "exam/get_detail_exam_id",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (id: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exam/getDetailExamById`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            id: id,
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

export const getDetailExamNonAnsById = createAsyncThunk(
  "exam/get_detail_exam_non_ans_id",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (id: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exam/getDetailExamNonAnsById`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            id: id,
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

export const submitExam = createAsyncThunk(
  "exam/submit_exam",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (examSubmitData: any, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/exam/submitExam`,
        {
          body: examSubmitData,
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
        state.findExamList = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getExamByClassId.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getDetailExamById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getDetailExamById.fulfilled, (state, action) => {
      if (action.payload) {
        state.detailExam = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getDetailExamById.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(findExam, (state, action) => {
      if (action.payload !== undefined) {
        const findText: string = action.payload;
        state.findExamList = state.examList.filter((exam) => {
          return exam.examName.includes(findText);
        });
      } else if (action.payload === "") {
        state.findExamList = state.examList;
      }
    })
    .addCase(getDetailExamNonAnsById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getDetailExamNonAnsById.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log(action.payload);
        state.detailExamNonAns = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getDetailExamNonAnsById.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(submitExam.pending, (state) => {
      state.isSubmitting = true;
    })
    .addCase(submitExam.fulfilled, (state) => {
      state.isSubmitting = false;
    })
    .addCase(submitExam.rejected, (state) => {
      state.isSubmitting = false;
    });
});

export default examReducer;
