import { useNavigate } from "react-router-dom";
import { MenuOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

interface PropType {
  id: string | undefined;
  className: string;
  teacherUsername: string;
  amount: number;
  img: string;
  subject: string;
  introduction: string;
  dateCreated: Date;
}

const ClassCard = (props: PropType) => {
  const { id, className, img, introduction, teacherUsername } = props;

  const navigate = useNavigate();

  const handleActions = (name: string) => {
    if (name === "join") {
      navigate(`/home/classes/${id}`);
    }
  };

  return (
    <Card
      className="w-[250px]"
      cover={
        <div className="w-[100%] h-[200px]">
          <img alt="example" src={img} className="w-[100%] object-cover" />
        </div>
      }
      actions={[
        <MenuOutlined
          key="detail"
          onClick={() => {
            handleActions("detail");
          }}
        />,
        <SendOutlined
          key="join"
          onClick={() => {
            handleActions("join");
          }}
        />,
      ]}
    >
      <Meta
        avatar={<Avatar>{teacherUsername?.charAt(0).toUpperCase()}</Avatar>}
        title={className}
        description={introduction}
      />
    </Card>
  );
};

export default ClassCard;
