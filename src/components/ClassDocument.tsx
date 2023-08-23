import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { Button, Space, Table, Card, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";

import { ClassroomType } from "../types/class.type";
import { DocumentType } from "../types/document.type";

import { transformDate3 } from "../helpers/transform";

import LoadingCpm from "./LoadingCpm";

import {
  uploadDocument,
  uploadMultiDocument,
  downloadDocument,
  getDocumentByClassId,
  deleteDocument,
} from "../redux/reducers/document.reducer";

interface DataType {
  key: number;
  id: string;
  fileName: string;
  dateUploaded: string;
}

const { Search } = Input;

const ClassDocument = () => {
  const [fileChange, setFileChange] = useState<any>();
  const [fileList, setFileList] = useState<any>(null);
  const data: DataType[] = [];

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  const detailClass = useSelector<RootState, ClassroomType | null>(
    (state) => state.class.detailClass
  );

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.document.isLoading
  );

  const classDocumentList = useSelector<RootState, DocumentType[]>(
    (state) => state.document.classDocumentList
  );

  const findDocumentList = useSelector<RootState, DocumentType[]>(
    (state) => state.document.findDocumentList
  );

  useEffect(() => {
    if (detailClass?.id !== undefined)
      dispatchAsync(getDocumentByClassId(detailClass?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailClass?.id]);

  if (findDocumentList.length !== 0) {
    findDocumentList?.map((doc, index) => {
      const docData: DataType = {
        key: index + 1,
        id: doc.id,
        fileName: doc.fileName,
        dateUploaded: transformDate3(doc.dateUploaded),
      };

      return data.push(docData);
    });
  }

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileChange.target.files[0]);
    const data = {
      formData: formData,
      classId: detailClass?.id,
    };

    if (detailClass !== null) {
      const rs = await dispatchAsync(uploadDocument(data));
      if (rs.payload === true) {
        toast.success("Tải tài liệu thành công");
      } else {
        toast.error("Tải tài liệu thất bại");
      }
    }
  };

  const handleUploadMulti = async (e: any) => {
    e.preventDefault();
    if (!fileList) {
      return;
    } else {
      const formData = new FormData();
      const files = fileList ? [...fileList] : [];

      files.map((file: any) => {
        formData.append("files", file);
      });

      const data = {
        formData: formData,
        classId: detailClass?.id,
      };

      if (detailClass !== null) {
        const rs = await dispatchAsync(uploadMultiDocument(data));
        if (rs.payload === true) {
          toast.success("Tải tập tài liệu thành công");
          dispatchAsync(getDocumentByClassId(detailClass?.id));
          console.log("fetch data");
        } else {
          toast.error("Tải tập tài liệu thất bại");
        }
      }
    }
  };

  const handleDownloadFile = async (fileName: string) => {
    const data = {
      classId: detailClass?.id,
      fileName: fileName,
    };
    const rs = await dispatchAsync(downloadDocument(data));
    FileDownload(rs.payload, "temp.pdf");
  };

  const handleDeleteFile = async (documentId: string) => {
    const rs = await dispatchAsync(deleteDocument(documentId));
    console.log(rs);
    if (
      rs.type === "document/delete_document/fulfilled" &&
      rs.payload === true
    ) {
      toast.success("Xóa tài liệu thành công");
      dispatchAsync(getDocumentByClassId(detailClass?.id));
    } else {
      toast.error("Xóa tài liệu thất bại");
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã tài liệu",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tên tài liệu",
      dataIndex: "fileName",
      key: "fileName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ngày upload",
      dataIndex: "dateUploaded",
      key: "dateUploaded",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              handleDownloadFile(record.fileName);
            }}
          >
            Download tài liệu
          </Button>
          {roles.includes("teacher") && (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDeleteFile(record.id);
              }}
            >
              Xóa tài liệu
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="w-[100%] mt-10 flex flex-col items-start gap-10">
      {/* <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="file"
          onChange={(e: any) => {
            setFileChange(e);
          }}
        />
        <Button type="primary" htmlType="submit" onClick={handleUpload}>
          Tải tài liệu
        </Button>
      </form> */}
      {roles.includes("teacher") && (
        <Card title="Upload tài liệu định dạng pdf:">
          <form className="flex flex-col gap-4">
            <input
              type="file"
              className="block md:w-[400px] text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
            file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              multiple
              onChange={(e) => {
                setFileList(e.target.files);
              }}
            />
            {/* <input
            type="file"
            onChange={(e) => {
              setFileList(e.target.files);
            }}
            multiple
          /> */}
            <Space className="mt-10">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleUploadMulti}
                danger
              >
                Upload tài liệu
              </Button>
            </Space>
          </form>
        </Card>
      )}
      {isLoading ? (
        <LoadingCpm />
      ) : (
        <div className="flex flex-col items-start w-[100%] gap-10">
          <Space.Compact>
            <Search
              placeholder="Tìm kiếm tài liệu"
              allowClear
              onChange={(e) => {
                dispatch({ type: "find_document", payload: e.target.value });
              }}
            />
          </Space.Compact>
          <Table className="w-[100%]" columns={columns} dataSource={data} />
        </div>
      )}
    </div>
  );
};

export default ClassDocument;
