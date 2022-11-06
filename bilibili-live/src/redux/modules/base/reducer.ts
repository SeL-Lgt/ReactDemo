import { AnyAction } from 'redux';
import * as types from '@/redux/mutation-types';
import { BaseState } from '@/redux/interface';

const baseState: BaseState = {
  navList: [{ path: '', title: '', children: false }],
};

const baseReducer = (state: BaseState = baseState, action: AnyAction) => {
  const { type, navList } = action;
  switch (type) {
    case types.SET_BASE_NAV_LIST:
      return { ...state, navList };
    default:
      return state;
  }
};

export default baseReducer;
