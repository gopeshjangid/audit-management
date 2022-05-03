import React from "react";
import ComingSoonImg from "../../assets/images/coming-soon.png";
import Layout from "../../components/layout/layout";
const ComingSoon = () => {
  return (
    // <div style={{textAlign: "center", position: "absolute",top: "40%", left: "42%", fontSize: "-webkit-xxx-large", color: "#ec008c"}}>Coming Soon</div>
    <Layout>
    <div>
      <img
        style={{
          textAlign: "center",
          position: "absolute",
          top: "40%",
          left: "42%",
          fontSize: "-webkit-xxx-large",
          color: "#ec008c",
        }}
        src={ComingSoonImg}
        alt="Coming"
      />
    </div>
    </Layout>
  );
};

export default ComingSoon;
