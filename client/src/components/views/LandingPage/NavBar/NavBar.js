import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenuHOC';
import {Button, Col, Drawer, Row} from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';

function NavBar(props){
    
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }
    
    return(
        <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="menu__container">
          <Row>
              <Col span={2}>
              <div className="menu__logo">
                <a href="/">Logo</a>
              </div>
              </Col>
              <Col span={18}>
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