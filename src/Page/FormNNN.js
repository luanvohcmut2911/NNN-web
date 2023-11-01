import backgroundImage from '../asset/background.jpg';
import { Row, Col, Form, Typography, Input, Button } from 'antd';

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
    justifyContent:'center',
    alignItems:'center',
  },
  formCSS:{
    width: "100%",
    height: "80vh",
    backgroundColor: "white",
    borderRadius: "24px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputCSS:{
    borderRadius: '40px'
  }
}


const onFinish = ()=>{

}

const FormNNN = () => {
  return (
    <Row style={CSSProps.backgroundCSS}>
      <Col span={12}></Col>
      <Col span={8}>
        <Form
            name="normal-login"
            style={CSSProps.formCSS}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
          <Typography.Title level={2}> WELCOME TO NNN CHECK_IN </Typography.Title>
          
          
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
              <Input style={CSSProps.inputCSS}
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
                // onClick={handleEmailLogin}
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
                width: "100%",
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
                // handleGoogleLogin(googleProvider);
              }}
            >
              {/* <GoogleIcon /> */}
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
      </Col>
      <Col span={4}></Col>
    </Row>
  )
}

export default FormNNN;