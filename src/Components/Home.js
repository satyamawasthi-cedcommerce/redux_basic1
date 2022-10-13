import React, { useState } from "react";
import {
  FullscreenBar,
  DisplayText,
  Card,
  TextField,
  Button,
} from "@shopify/polaris";
import { validate } from "../Redux/Action";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    sellerName: "",
    password: "",
  });

  const authenticateLogin = (event) => {
    fetch(
      `https://fbapi.sellernext.com/user/login?username=${data.username}&&password=${data.password}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
        },
      }
    )
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        if (actualData.success) {
          sessionStorage.setItem(
            "data", JSON.stringify({ username: data.username, sellerName:data.sellerName, token: actualData.data.token })
          );
          props.validate();
          navigate("/user");
        } else {
          alert("Kindly enter correct user credentials");
        }
      }, []);
    console.log(props.user);
  };

  return (
    <>
      <FullscreenBar>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <DisplayText size="small">Redux Login Authentication</DisplayText>
          </div>
        </div>
      </FullscreenBar>
      <div style={{ width: "60%", marginLeft: "20%", marginTop: "10%" }}>
        <Card sectioned>
          <>
            <TextField
              type="text"
              label="Enter Seller Name"
              autoComplete="on"
              onChange={(value) =>
                setData({
                  ...data,
                  sellerName: value,
                })
              }
              value={data.sellerName}
              requiredIndicator
            />
            <br />
            <TextField
              type="text"
              label="Enter UserName"
              autoComplete="on"
              onChange={(value) =>
                setData({
                  ...data,
                  username: value,
                })
              }
              value={data.username}
              requiredIndicator
            />
            <br />
            <TextField
              type="password"
              label="Enter Password"
              autoComplete="on"
              onChange={(value) =>
                setData({
                  ...data,
                  password: value,
                })
              }
              value={data.password}
              requiredIndicator
            />
            <br />
            <div style={{ color: "#004225" }}>
              <Button monochrome outline onClick={() => authenticateLogin()}>
                Login
              </Button>
            </div>
          </>
        </Card>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
// this function is passed as second argument to connect
const mapDispatchToProps = (dispatch) => {
  return {
    validate: (value) => dispatch(validate(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
