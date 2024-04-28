import { Breadcrumb, theme, Image } from "antd";

const Home = function () {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Bán Hoa</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          width:'100%',
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Image style={{width:'100%'}} preview={false} ></Image>
      </div>
    </>
  );
};
export default Home;
