import backgroundImage from '../asset/background.jpg';
import { Typography, Avatar, List, Progress } from 'antd';
import { getDashboard } from '../firebase/utils';
import { useState, useEffect } from 'react';

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
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
  },
  formCSS:{
    minWidth: "60%",
    height: "80vh",
    backgroundColor: "white",
    borderRadius: "24px",
    display: 'flex',
    flexDirection: 'column',
    padding:"1rem",
    overflow: 'auto'
  }
}

const Stat = () => {
  const [dashboard, setDashboard] = useState([]);
  useEffect(()=>{
    getDashboard('users').then((res)=>{
      setDashboard(res);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  // const [api, contextHolder] = notification.useNotification();
  // const handleNotification = ()=>{
  //   console.log("click")
  //   api.info({
  //     message: "This feature is implementing"
  //   })
  // }
  const checktuvi = (nnnDay)=>{
    if(nnnDay < 5){
      return "Luyện Khí Kì";
    }
    else if(nnnDay < 10){
      return "Trúc Cơ kì";
    }
    else if(nnnDay < 15){
      return "Kim Đan kì";
    }
    else if(nnnDay < 20){
      return "Nguyên Anh kì";
    }
    else if(nnnDay < 25){
      return "Hóa Thần kì";
    }
    else if(nnnDay < 30){
      return "Độ Kiếp phi thằng tiên giới";
    }
    else {
      return "Thành tiên"
    }
  }
  return (
    <div style={CSSProps.backgroundCSS}>
      {/* {contextHolder} */}
      <div
          style={CSSProps.formCSS}
      >
        <Typography.Title level={2}> TOP SERVER </Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={dashboard}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                key = {item.id}
                avatar={<Avatar src={item?.data?.photoURL} />}
                title={<Typography.Text>{item?.data?.name}</Typography.Text>}
                description={
                  <div>
                    <Typography.Text>Số ngày tích lũy: {item?.data?.nnnDay}, chuỗi hiện tại: {item?.data?.currentStreak}</Typography.Text>
                    <Progress percent={Math.round(item?.data?.nnnDay / 30 * 100)} status="active"></Progress>
                    <Typography.Text>Tu vi hiện tại: {checktuvi(item?.data?.nnnDay)}</Typography.Text> 
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      
    </div>
  )
}

export default Stat;