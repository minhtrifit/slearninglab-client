import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { Button, Space } from "antd";
import { toast } from "react-toastify";

import { ClassroomType } from "../types/class.type";

import {
  uploadDocument,
  uploadMultiDocument,
  downloadDocument,
} from "../redux/reducers/document.reducer";

const ClassDocument = () => {
  const [fileChange, setFileChange] = useState<any>();
  const [fileList, setFileList] = useState<any>(null);

  const dispatchAsync = useAppDispatch();

  const detailClass = useSelector<RootState, ClassroomType | null>(
    (state) => state.class.detailClass
  );

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
        } else {
          toast.error("Tải tập tài liệu thất bại");
        }
      }
    }
  };

  return (
    <div>
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
      <Space size="large" className="mt-10 flex flex-col items-start">
        <form className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-sky-500">
            Tài tài liệu văn bản (định dạng pdf)
          </p>
          <input
            type="file"
            onChange={(e) => {
              setFileList(e.target.files);
            }}
            multiple
          />
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleUploadMulti}
            >
              Upload tài liệu
            </Button>
          </Space>
        </form>
        <Space className="mt-10">
          <Button
            type="primary"
            onClick={async () => {
              const rs = await dispatchAsync(downloadDocument());
              console.log(rs.payload);
            }}
          >
            Download tài liệu
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default ClassDocument;
