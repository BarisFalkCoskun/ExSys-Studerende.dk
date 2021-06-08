import React from "react";
import { Layout } from "antd";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from "./components/DashboardPage";

const AppLayout = () => (
    <Layout>
      <Header />
      <Layout>
        <Sidebar />
        <DashboardPage />
      </Layout>
    </Layout>
);

export default AppLayout;