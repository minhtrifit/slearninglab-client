import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import type { UploadProps } from "antd/es/upload/interface";

interface PropType {
  Form: any;
  name: any;
  restField: any;
}

const ExamUpload = (propsValue: PropType) => {
  const { Form, name, restField } = propsValue;

  const [fileList, setFileList] = useState<any>([]);

  const handleUpload = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESETNAME
      );
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);

      const rs = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUDNAME
        }}/image/upload`,
        formData
      );

      //   console.log(rs.data.url);
      return rs.data.url;
    } catch (error) {
      console.error(error);
      message.error("Tải ảnh thất bại");
    }
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    // eslint-disable-next-line no-var
    for (var i = 0; i < newFileList.length; ++i) {
      const url = await handleUpload(newFileList[i].originFileObj);
      newFileList[i] = { ...newFileList[i], url: url };
    }

    setFileList(newFileList);
  };

  const props = {
    multiple: true,
  };
  return (
    <Form.Item {...restField} label="Hình ảnh minh họa" name={[name, "image"]}>
      <Upload
        {...props}
        fileList={fileList}
        beforeUpload={() => false}
        onChange={(info) => {
          handleChange(info);
        }}
      >
        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
      </Upload>
    </Form.Item>
  );
};

export default ExamUpload;
