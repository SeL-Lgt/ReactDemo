import * as React from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import BILIBILI from '@/assets/images/bilibili.png';
import { BaseState } from '@/mock/interface';
import {
  requestBaseNavList,
  setBaseNavList,
} from '@/redux/modules/base/action';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { NavList } from '@/components/NavList';

type PropType = {
  requestNav: () => void;
  baseReducer: BaseState;
};

function Header(props: PropType) {
  const { requestNav, baseReducer } = props;
  useEffect(() => {
    requestNav();
  }, []);

  return (
    <>
      <header className='header'>
        <Link to='/'>
          <img src={BILIBILI} />
        </Link>
      </header>
      <NavList baseReducer={baseReducer} />
    </>
  );
}

const mapStateToProps = (state: { baseReducer: BaseState }) => {
  return { baseReducer: state.baseReducer };
};
const mapDispatchToProps = { setBaseNavList, requestNav: requestBaseNavList };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
