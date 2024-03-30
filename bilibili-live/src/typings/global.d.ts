declare interface Result<T> {
  data: T;
  message: string;
  status: number | boolean;
}
/**
 * 导航栏数据
 */
declare interface NavItem {
  path: string;
  title: string;
  children?: false | NavItem[];
}
