import backgroundImage from '../asset/background.jpg';
import { Typography, Avatar, List } from 'antd';
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
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:"1rem",
    overflow: 'auto'
  }
}

// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
//   {
//     title: 'Ant Design Title 5',
//   },
//   {
//     title: 'Ant Design Title 6',
//   },
//   {
//     title: 'Ant Design Title 7',
//   },
//   {
//     title: 'Ant Design Title 8',
//   },
// ]

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
                description={<Typography.Text>Số ngày tích lũy: {item?.data?.nnnDay}, chuỗi hiện tại: {item?.data?.currentStreak}</Typography.Text>}
              />
            </List.Item>
          )}
        />
      </div>
      
    </div>
  )
}

export default Stat;