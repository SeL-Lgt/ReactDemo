import * as React from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import BILIBILI from '@/assets/images/bilibili.png';
import { Tabs } from 'antd-mobile';

export const Header = () => {
  return (
    <>
      <header className='header'>
        <Link to='/'>
          <img src={BILIBILI} />
        </Link>
      </header>
      <Tabs>
        <Tabs.Tab title='水果' key='fruits'>
          菠萝
        </Tabs.Tab>
      </Tabs>
    </>
  );
};
