import request from '@/api/request';
import RouterApi from '@/api/api';

class RouterServices {
  static getRouter = async <T = NavItem[]>() => {
    const res = await request.get({
      url: RouterApi.router,
    });
    return res as Result<T>;
  };
}

export default RouterServices;
