import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ExamType,
  ExamInfo,
  ExamTypeNonAns,
  ResultType,
} from "../../types/exam.type";
import axios from "axios";

import { findExam } from "../actions/exam.action";

import { transformDate3 } from "../../helpers/transform";

// Interface declair
interface ExamState {
  isCreating: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  examList: ExamInfo[];
  detailExam: ExamType | undefined;
  findExamList: ExamInfo[];
  detailExamNonAns: ExamTypeNonAns | undefined;
  isSubmitting: boolean;
  getResult: ResultType | undefined;
  userExamResult: any[];
}

// InitialState value
const initialState: ExamState = {
  isCreating: false,
  isDeleting: false,
  isLoading: false,
  examList: [],
  detailExam: undefined,
  findExamList: [],
  detailExamNonAns: undefined,
  isSubmitting: false,
  getResult: undefined,
  userExamResult: [],
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

export const deleteExam = createAsyncThunk(
  "exam/delete_exam",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (examId: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/exam/deleteExam`,
        {
          body: { examId: examId },
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

export const getExamResultByUsername = createAsyncThunk(
  "exam/get_exam_result_by_username",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (username: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exam/getExamResultByUsername`,
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
      state.getResult = undefined;
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
      state.getResult = undefined;
    })
    .addCase(submitExam.pending, (state) => {
      state.isSubmitting = true;
    })
    .addCase(submitExam.fulfilled, (state, action) => {
      if (action.payload) {
        state.getResult = action.payload;
        // console.log(state.getResult);
      }
      state.isSubmitting = false;
    })
    .addCase(submitExam.rejected, (state) => {
      state.isSubmitting = false;
    })
    .addCase(deleteExam.pending, (state) => {
      state.isDeleting = true;
    })
    .addCase(deleteExam.fulfilled, (state) => {
      state.isDeleting = false;
    })
    .addCase(deleteExam.rejected, (state) => {
      state.isDeleting = false;
    })
    .addCase(getExamResultByUsername.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getExamResultByUsername.fulfilled, (state, action) => {
      state.userExamResult = [];
      action.payload.map((result: any) => {
        state.userExamResult.push({
          key: result?.id,
          name: result?.examInfo?.examName,
          className: result?.classInfo?.className,
          result: result?.result.toString() + "/" + result?.amount.toString(),
          date: transformDate3(result.date),
        });
      });
      state.isLoading = false;
    })
    .addCase(getExamResultByUsername.rejected, (state) => {
      state.isLoading = false;
    });
});

export default examReducer;
