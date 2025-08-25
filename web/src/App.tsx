import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Contacts from './pages/Contacts';
import ChatRooms from './pages/ChatRooms';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zh_CN}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/chatrooms" element={<ChatRooms />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;