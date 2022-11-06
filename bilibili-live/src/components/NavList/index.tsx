import * as React from 'react';
import { Dropdown, Tabs } from 'antd-mobile';
import { BaseState } from '@/mock/interface';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import { DropdownRef } from 'antd-mobile/es/components/dropdown';

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
  const [childrenActiveKey, setChildrenActiveKey] = useState<string>('');
  const [parentActiveKey, setParentActiveKey] = useState<string>('');
  const ref = useRef<DropdownRef>(null);

  /**
   * 监听路径
   * 有子路由则自动跳转第一个
   * 分别记录父、子选项卡当前选择key
   */
  useEffect(() => {
    const pathArr = pathname.match(/\/\w+/g);
    if (Array.isArray(pathArr)) {
      const [parentTab, childrenTab] = pathArr;
      if (parentTab === '/shouye') {
        setChildren([]);
      }
      if (!childrenTab && children.length > 0 && parentTab !== '/shouye') {
        navigate(`${parentTab}/1`);
      }
      setParentActiveKey(parentTab);
      setChildrenActiveKey(pathname);
    }
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
   * @param path 当前激活选项卡---路径决定
   */
  function clickEvent(path: string) {
    const childrenList = navList.filter(
      (item) => item.path === path && item.children,
    )[0]?.children;
    setChildren(childrenList || []);
  }

  /**
   * 选项卡视图遍历展示
   * @param list
   */
  function tabView(list: NavItem[]) {
    const listView = list.map((item: NavItem) => {
      return (
        <Tabs.Tab
          title={<div onClick={() => goRouter(item.path)}>{item.title}</div>}
          key={item.path}
        />
      );
    });
    return listView;
  }

  /**
   * 下拉路由导航
   * @param list
   */
  function dropdownView(list: NavItem[]) {
    return list.map((item) => (
      <div
        onClick={() => {
          ref.current?.close();
          clickEvent(item.path);
          goRouter(item.path);
        }}
      >
        {item.title}
      </div>
    ));
  }

  return (
    <div className='NavList'>
      <div className='top'>
        <Tabs activeKey={parentActiveKey} onChange={(item) => clickEvent(item)}>
          {tabView(navList)}
        </Tabs>
        <Dropdown ref={ref}>
          <Dropdown.Item arrow={<DownOutline />} key='DownOutline' title=''>
            <div className='dropdownView'>
              <div className='content'>{dropdownView(navList)}</div>
              <UpOutline
                onClick={() => {
                  ref.current?.close();
                }}
                className='icon'
              />
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      {children.length > 0 && (
        <Tabs key={childrenActiveKey} activeKey={childrenActiveKey}>
          {tabView(children)}
        </Tabs>
      )}
    </div>
  );
}
