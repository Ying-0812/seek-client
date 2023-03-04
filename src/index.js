import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd';
import { BrowserRouter} from 'react-router-dom'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <React.StrictMode>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </React.StrictMode>
    </ConfigProvider>
  </Provider>
)
