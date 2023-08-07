import { Layout } from "antd";

const { Footer } = Layout;

interface propType {
  Footer: typeof Footer;
}

const HomeFooter = (props: propType) => {
  const { Footer } = props;

  return (
    <Footer style={{ textAlign: "center" }}>
      Copyright© Created by minhtrifit
    </Footer>
  );
};

export default HomeFooter;
