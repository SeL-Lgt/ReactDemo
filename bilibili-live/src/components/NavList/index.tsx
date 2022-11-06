import * as React from 'react';
import { Tabs } from 'antd-mobile';
import { BaseState } from '@/mock/interface';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';
import { DownOutline } from 'antd-mobile-icons';

type PropType = {
  baseReducer: BaseState;
};

export function NavList(props: PropType) {
  const location = useLocation();
  const navigate = useNavigate();
  const { baseReducer } = props;
  const { pathname } = location;
  const { navList } = baseReducer;
  const [children, setChildren] = useState<NavItem[]>([]);
  const [actionKey, setActionKey] = useState<string>('');

  useEffect(() => {
    const pathRule = /^\/\w+$/.test(pathname) || /^\/\w+\/$/.test(pathname);
    if (pathRule && children.length > 0) {
      const type = pathname.match(/^\/[^/]*/);
      navigate(`${type}/1`);
    }
    setActionKey(pathname);
  }, [pathname]);

  /**
   * 路由跳转
   * @param path
   */
  function goRouter(path: string) {
    navigate(path);
  }

  /**
   * 获取当前父选项是否有子路由
   * @param key 当前激活选项卡
   */
  function clickEvent(key: string) {
    const childrenList = navList.filter(
      (item) => item.path === key && item.children,
    )[0]?.children;
    setChildren(childrenList || []);
  }

  /**
   * 选项卡视图遍历展示
   * @param list
   */
  function view(list: NavItem[]) {
    const listView = list.map((item: NavItem) => {
      return (
        <Tabs.Tab
          title={
            <div
              onClick={() => {
                goRouter(item.path);
              }}
            >
              {item.title}
            </div>
          }
          key={item.path}
        />
      );
    });
    return listView;
  }

  return (
    <div className='NavList'>
      <div className='top'>
        <Tabs onChange={(item) => clickEvent(item)}>{view(navList)}</Tabs>
        <DownOutline className='icon' color='var(--adm-color-weak)' />
      </div>
      {children.length > 0 && (
        <Tabs activeKey={actionKey}>{view(children)}</Tabs>
      )}
    </div>
  );
}
