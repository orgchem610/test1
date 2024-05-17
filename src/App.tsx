import React from 'react';
import './App.css';
import { ContestList } from './components/matchboard/ContestList';
import { SideMenu } from './components/matchboard/SideMenu';
import { ConfigProvider, FloatButton, Layout, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { TopTab } from './components/TopTab';
import { MoonOutlined } from '@ant-design/icons';
import { useLocalBool } from './utility/localStrage';
import { RoundSelect } from './components/matchboard/RoundSelect';
import { ContestContext, useContestContext } from './contexts/Contest';
import { UserFab } from './components/UserFab';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const paddingSize = 5;

function App() {
    const [darkMode, setDarkMode] = useLocalBool("darkMode", window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [collapsed, setCollapsed] = useLocalBool("sideCollapsed", false);

    const contest = useContestContext();

    return (
        <div className="App">
            <BrowserRouter>
                <ConfigProvider theme={
                    darkMode ? {
                        algorithm: theme.darkAlgorithm,
                    } : {
                        algorithm: theme.defaultAlgorithm,
                    }
                }>
                    <ContestContext.Provider value={contest}>
                        <Layout style={{ minHeight: '100vh', overflow: "hidden" }}>
                            <Header style={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <TopTab />
                                <FloatButton
                                    icon={<MoonOutlined />}
                                    type={darkMode ? "primary" : "default"}
                                    style={{ right: 24, top: 12 }}
                                    onClick={() => { setDarkMode(!darkMode) }}
                                />
                                <UserFab />
                            </Header>
                            <Layout style={{ paddingTop: paddingSize }}>
                                <Sider
                                    theme='light'
                                    collapsible
                                    collapsed={collapsed}
                                    onCollapse={(value) => setCollapsed(value)}
                                >
                                    <SideMenu />
                                </Sider>
                                <Content style={{ paddingLeft: paddingSize, paddingRight: paddingSize, }}>
                                    <Routes>
                                        <Route path='/matchboard'>
                                            <Route path=':yyyy/:mm/:dd' element={<ContestList />} />
                                            <Route path=':yyyy/:mm/:dd/:class/:round' element={<RoundSelect />} />
                                        </Route>
                                    </Routes>
                                </Content>
                            </Layout>
                        </Layout>
                    </ContestContext.Provider>
                </ConfigProvider></BrowserRouter>
        </div>
    );
}

export default App;
