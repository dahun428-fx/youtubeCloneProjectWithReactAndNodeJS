import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { FolderOpenOutlined, HomeOutlined, PushpinOutlined, UploadOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
const { Sider } = Layout;

function SideMenu(props){
    const user = useSelector(state => state.user);
    const [ MenuTarget, setMenuTarget ] = useState("home");
    const collapse = useSelector(state => state.active.payload);
    useEffect(()=>{
        setMenuTarget(window.location.pathname);
    },[])

    const AuthenticationMenu = () => {
        if( user.userData && user.userData.isAuth ){
            return (
                (
                <>
                <Menu.Item key="/video/upload" icon={<UploadOutlined />}>
                  <a href="/video/upload">Upload</a>
                </Menu.Item>
                <Menu.Item key="/my/video" icon={<FolderOpenOutlined />}>
                  <a href="/my/video">MyVideo</a>
                </Menu.Item>
                </>
                )
            );
        } 
    }

    return (
        <Sider  trigger={null} collapsed={collapse} style={{marginTop:'68px'}}>
          <Menu
            defaultOpenKeys={MenuTarget}
            mode="inline"
            theme="white"
            style={{height: '100%', borderRight: 0}}
            inlineCollapsed={props.Collapse}
            selectedKeys={MenuTarget}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="/subscription" icon={<PushpinOutlined />}>
                <a href="/subscription">Subscription</a>
            </Menu.Item>
            {AuthenticationMenu()}
            
          </Menu>
        </Sider>

      );
}

export default SideMenu;