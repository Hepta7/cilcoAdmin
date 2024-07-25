import React, { useState } from "react";
import { ConfigProvider, Menu, Switch } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import Routes from "./route";
import { HashRouter } from "react-router-dom";
import { useMount } from "ahooks";

const App: React.FC = () => {
  useMount(() => {
    window.location.replace("#/adminPanel");
  });

  return (
    <>
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <Routes></Routes>
        </HashRouter>
      </ConfigProvider>
    </>
  );
};

export default App;