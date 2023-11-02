import backgroundImage from '../asset/background.jpg';
import { Form, Typography, notification, Button, Radio } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { updateDashboard } from '../firebase/utils';

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
  },
  buttonCSS:{
    margin: '2rem',
    width: '80%'
  }
}

const Login = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  useEffect(()=>{
    if(!user){
      navigate('/')
    }
  }, [user, navigate]);
  const [api, contextHolder] = notification.useNotification();
  const [time, setTime] = useState(new Date());
  const [option, setOption] = useState(1);
  const onChange = (e)=>{
    setOption(e.target.value);
  }
  const name = user?.user?.displayName.split(" ")[0];
  const currentDate = new Date();
  const handleNotification = ()=>{
    api.warning({
      message: "Anh bạn chắc chưa? Sống thật đi",
      description: <Button type="primary" onClick = {()=>{
        updateDashboard('users', {
          docID: user?.docID,
          uid: user?.user?.uid,
          name: user?.user?.displayName,
          photoURL: user?.user?.photoURL,
          checkinDays: [currentDate],
          isNewUser: user?.isNewUser,
          failed: option === 1 ? 1 : 0
        }).then(()=>{
           navigate('/stat');
        })
        
      }}>Chắc chắn rồi</Button>
    })
  }
  const handleSubmit = ()=>{
    handleNotification();
  }
  setInterval(()=>{
    setTime(new Date());
  }, 1000);
  return (
    user && <div style={CSSProps.backgroundCSS}>
      {contextHolder}
      <Form
          name="normal-login"
          style={CSSProps.formCSS}
          layout="vertical"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
      >
        <Typography.Title level={2}> Xin chào, {name} </Typography.Title>
        <Typography.Title level={2}> Hôm nay bạn đã thất bại chưa ? </Typography.Title>
        <Typography.Title level={3}> Ngày {time.toLocaleDateString('vi-vn')}, {time.toLocaleTimeString()} </Typography.Title>
        <Radio.Group onChange={onChange} value={option} size="large" buttonStyle='solid'>
          <Radio.Button value={1}>Đã fail</Radio.Button>
          <Radio.Button value={2}>Vẫn đang trong chuỗi</Radio.Button>
        </Radio.Group>
        <Form.Item style={CSSProps.buttonCSS}>
          <Button type="primary" block onClick = {handleSubmit} >Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;