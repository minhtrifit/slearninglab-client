import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Interface declair
interface DocumentState {}

// InitialState value
const initialState: DocumentState = {};

// createAsyncThunk middleware
export const uploadDocument = createAsyncThunk(
  "document/upload_document",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (
    data: { formData: FormData; classId: string | undefined },
    thunkAPI
  ) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/document/upload`,
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            classId: data.classId,
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

export const uploadMultiDocument = createAsyncThunk(
  "document/upload_multi_document",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (
    data: { formData: FormData; classId: string | undefined },
    thunkAPI
  ) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/document/uploads`,
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            classId: data.classId,
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

export const downloadDocument = createAsyncThunk(
  "document/download_document",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/document/download`,
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

const documentReducer = createReducer(initialState, (builder) => {
  builder;
});

export default documentReducer;
