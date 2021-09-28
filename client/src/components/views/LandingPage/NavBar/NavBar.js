import React, { useEffect, useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenuHOC';
import {Button, Col, Drawer, Row} from 'antd';
import { MenuOutlined, UnorderedListOutlined, YoutubeFilled } from '@ant-design/icons';
import './Sections/Navbar.css';
import { useDispatch } from 'react-redux';

function NavBar(props){
    
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [ Collapse, setCollapse ] = useState(false);

    useEffect(()=>{
      dispatch(changeCollapse())
    });

    const showDrawer = () => {
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }
    const changeCollapse = () => {
        return{
          type : 'collapse',
          payload : Collapse
        }
    }
    const onClickSideMenuHanlder = () => {
      dispatch(changeCollapse());
      setCollapse(!Collapse);
    }

    return(
        <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="menu__container">
          <Row>
              <Col span={4}>
              <div className="menu__logo">
                <span style={{display:'block', marginTop:'25px', marginRight:'10px', float:'left'}}>
                  <MenuOutlined onClick={onClickSideMenuHanlder} style={{fontSize:'20px',  cursor:'pointer'}}/>
                </span>
                <a href="/" style={{float:'left'}}><YoutubeFilled style={{fontSize:'30px', color:'red'}} />
                  <span style={{position:'relative', top:'-3px', left:'2px', color:'black', fontWeight:'bold'}}>YouTube</span>
                </a>
              </div>
              </Col>
              <Col span={16}>
                <div className="menu_left">
                  <LeftMenu mode="horizontal" />
                </div>
              </Col>
              <Col span={4}>
                <div className="menu_rigth">
                  <RightMenu mode="horizontal"/>
                </div>
                <Button
                  className="menu__mobile-button"
                  type="primary"
                  onClick={showDrawer}
                >
                  <UnorderedListOutlined />
                </Button>
              </Col>
          </Row>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    )
}
export default NavBar;