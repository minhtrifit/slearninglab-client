import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { DocumentType } from "../../types/document.type";

import { findDocument } from "../actions/document.action";

// Interface declair
interface DocumentState {
  isLoading: boolean;
  classDocumentList: DocumentType[];
  findDocumentList: DocumentType[];
}

// InitialState value
const initialState: DocumentState = {
  isLoading: false,
  classDocumentList: [],
  findDocumentList: [],
};

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

  async (data: { classId: string | undefined; fileName: string }, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/document/download`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          classId: data.classId,
          fileName: data.fileName,
        },
        responseType: "blob",
      });

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDocumentByClassId = createAsyncThunk(
  "document/get_document_by_class_id",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (classId: string | undefined, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/document/getDocumentByClassId`,
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

export const deleteDocument = createAsyncThunk(
  "document/delete_document",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (documentId: string, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/document/delete`,
        {
          body: documentId,
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

const documentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getDocumentByClassId.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getDocumentByClassId.fulfilled, (state, action) => {
      if (action.payload) {
        state.classDocumentList = action.payload;
        state.findDocumentList = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getDocumentByClassId.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(findDocument, (state, action) => {
      if (action.payload !== undefined) {
        const findText: string = action.payload;
        state.findDocumentList = state.classDocumentList.filter((document) => {
          return document.fileName.includes(findText);
        });
      } else if (action.payload === "") {
        state.findDocumentList = state.classDocumentList;
      }
    });
});

export default documentReducer;
