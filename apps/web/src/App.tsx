import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import RootRoutes from './RootRoutes';
import { AuthProvider } from './modules/auth/AuthProvider';
import store from './redux/redux.store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ConfigProvider>
            <RootRoutes />
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};
