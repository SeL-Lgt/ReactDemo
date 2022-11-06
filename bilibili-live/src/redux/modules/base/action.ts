import * as types from '@/redux/mutation-types';
import RouterServices from '@/api/router';
import { Dispatch } from 'react';

export const setBaseNavList = (navList: NavItem[]) => {
  return {
    type: types.SET_BASE_NAV_LIST,
    navList,
  };
};

interface NavListProps {
  type: string;
  navList: NavItem[];
}
export const requestBaseNavList = () => {
  return (dispatch: Dispatch<NavListProps>) => {
    RouterServices.getRouter().then((res) => {
      dispatch(setBaseNavList(res.data));
    });
  };
};
