import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
  Store,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import storage from 'redux-persist/lib/storage';
import baseReducer from '@/redux/modules/base/reducer';

// 组合多个reducer
const reducer = combineReducers({ baseReducer });

// 持久化配置
const persistConfig = {
  key: 'redux-persist',
  storage,
};

const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建store
const store: Store = createStore(
  persistReducerConfig,
  composeEnhancers(middleWares),
);

// 创建持久化store
const persistor = persistStore(store);

export { store, persistor };
