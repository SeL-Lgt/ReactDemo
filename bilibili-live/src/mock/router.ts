import Mockjs from 'mockjs';
import routerData from './data/routerData.json';

Mockjs.mock('/api/routerData', 'get', () => {
  return {
    status: 200,
    data: routerData,
  };
});
