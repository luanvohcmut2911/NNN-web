import backgroundImage from '../asset/background.jpg';
import { Form, Typography, Input, Button, notification } from 'antd';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from "firebase/auth";
import { AuthContext } from '../context/AuthProvider';
import { auth } from '../firebase/config';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserIDFirestore } from '../firebase/utils';

const CSSProps = {
  backgroundCSS:{
    margin: 0,
    padding: 0,
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent:'right',
    alignItems:'center',
  },
  formCSS:{
    minWidth: "30%",
    height: "80vh",
    backgroundColor: "white",
    borderRadius: "24px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding:"1rem",
    // marginRight: "5rem"
  },
  inputCSS:{
    padding: '1rem',
    borderRadius: '40px'
  }
}

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleLogin = async (provider) => {
    signInWithPopup(auth, provider).then((result)=>{
      const user = result.user;
      const detail = getAdditionalUserInfo(result);
      if(detail.isNewUser){
        setUser({ user, isNewUser: detail.isNewUser, docID: null });
        navigate('/daily-survey');
      }
      else{
        getUserIDFirestore('users',user.uid).then((res)=>{
          console.log({ user, isNewUser: detail.isNewUser, docID: res[0] })
          setUser({ user, isNewUser: detail.isNewUser, docID: res[0] });
          navigate('/daily-survey');
        })
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  const [api, contextHolder] = notification.useNotification();
  const handleNotification = ()=>{
    console.log("click")
    api.info({
      message: "This feature is implementing"
    })
  }
  return (
    <div style={CSSProps.backgroundCSS}>
      {contextHolder}
      <Form
          name="normal-login"
          style={CSSProps.formCSS}
          layout="vertical"
          initialValues={{ remember: true }}
      >
        <Typography.Title level={2}> WELCOME TO NNN CHECK IN </Typography.Title>
        <Form.Item>
          <Form.Item
            label={<Typography.Text strong>Email:</Typography.Text>}
            name="email"
            rules={[{ required: true, message: "Please enter your email! " }]}
          >
            <Input style={CSSProps.inputCSS}
              placeholder="abc@gmail.com"
            />
          </Form.Item>
          <Form.Item
            label={<Typography.Text strong>Password:</Typography.Text>}
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password style={CSSProps.inputCSS}
              placeholder="Password"
            />
          </Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "50px",
                padding: "20px 50px",
                display: "flex",
                alignItems: "center",
                float: "right",
                backgroundColor: "black",
              }}
              onClick={handleNotification}
            >
              <Typography.Text
                style={{
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Sign in
              </Typography.Text>
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "50px",
                padding: "20px 50px",
                display: "flex",
                alignItems: "center",
                float: "right",
                backgroundColor: "white",
                borderColor: "black",
                marginRight: "1rem",
              }}
              onClick={handleNotification}
            >
              <Typography.Text
                style={{
                  color: "black",
                  fontSize: "20px",
                }}
              >
                Sign up
              </Typography.Text>
            </Button>
          </div>
          <div
            style={{
              width: "22rem",
              height: "20px",
              borderBottom: "1px solid black",
              textAlign: "center",
              clear: "right",
              paddingTop: "1rem",
              marginBottom: "2rem",
              padding: 0,
            }}
          >
            <span
              style={{
                fontSize: "20px",
                backgroundColor: "#F3F5F6",
                padding: "0 10px",
              }}
            >
              Or
            </span>
          </div>
          <Button
            type="default"
            style={{
              width: "100%",
              borderRadius: "50px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              handleGoogleLogin(googleProvider);
            }}
          >
            <Typography.Text
              strong
              style={{
                fontSize: "20px",
                marginLeft: "1rem",
              }}
            >
              Continue with Google
            </Typography.Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;