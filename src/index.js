import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Button, Icon, Input, Table } from 'antd';
import './index.css';
import 'antd/dist/antd.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import Qs from 'qs';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const data = [];
const { TextArea } = Input.Search;


/**
 *Through filterDropdown custom column filtering function, and implement a search column way
 *
 */
class Footer extends React.Component {
    state = {
        searchText: '',
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (

            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {
        const columns = [{
            title: 'PID',
            dataIndex: 'pid',
            key: 'pid',
            width: 300,
            ...this.getColumnSearchProps('pid'),

        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            ...this.getColumnSearchProps('name'),

        }];

        return (
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        );
    }
}

export default Footer;


/**
 * The layout of UI by Ant Design
 */
class SiderDemo extends React.Component {
    state = {
        theme: 'dark',
        current: '1',
        visiable: false,
        tab: 0,
        ppid: null,
        resp: null,
        presp: null,
        orresp: null,
        adresp: null,
        hkresp: null,
        funcname: null,
        funcaddr: null,
        processname: null,
        applications: null,
        classname: null,
        moduleName: null,
        exportName: null,
        enlogcode: null,
        lelogcode: null
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    onMenuClick(falg) {
        this.setState({

            tab: falg
        })
        this.visiable = true

    }
    /**
     * get server respones and data
     */
    onGetProcess() {
        axios.get(`http://127.0.0.1:8000/process/`)
            .then(data => this.setState({
                presp: data.data
            }))
            .catch(console.log("发送请求失败"));



    }

    onSubmit() {

        axios({
            url: 'http://127.0.0.1:8000/admin/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {

                ppid: this.state.ppid,
                funcname: this.state.funcname,
                funcaddr: this.state.funcaddr,
                processname: this.state.processname

            }


        })
            .then(data => this.setState({
                resp: data.data
            }))
            .catch(console.log("发送请求失败"));
    }

    onOrUnpack() {
        axios({
            url: 'http://127.0.0.1:8000/orUnpack/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
                processname: this.state.processname,

            }


        })
            .then(data => this.setState({
                orresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    }

    onAdUnpack() {

        axios({
            url: 'http://127.0.0.1:8000/adUnpack/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
                processname: this.state.processname,

            }


        })

            .then(data => this.setState({
                adresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    }
    onNativeHook() {

        axios({
            url: 'http://127.0.0.1:8000/nativeHook/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
                processname: this.state.processname,
                funcname: this.state.funcname,
                classname: this.state.classname,
                enlogcode: this.state.enlogcode
            }


        })
            .then(data => this.setState({
                hkresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    }

    onInlineHook() {

        axios({
            url: 'http://127.0.0.1:8000/inlineHook/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
                processname: this.state.processname,
                moduleName: this.state.moduleName,
                exportName: this.state.exportName,
                enlogcode: this.state.enlogcode,
                lelogcode: this.state.lelogcode
            }


        })
            .then(data => this.setState({
                hkresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    }

    /**
     * handle the Json data,get pid and process name
     */
    getData() {
        var pdata = this.state.presp;
        //alert(pdata)
        alert("Please press GetProcess button again")
        for (var i = 0; i < pdata.length; i++) {
            data.push({
                key: i,
                pid: pdata[i][0],
                name: pdata[i][1]
            });


        }


    }

    render() {

        return (


            <div>

                <div style={{ float: "left" }}>
                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >

                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="android" />
                                    <span>Hook</span>
                                </span>
                            }
                        >

                            <Menu.ItemGroup key="g1" title="Ordinary Hook" >
                                <Menu.Item key="1" onClick={() => this.onMenuClick(0)} >Native Hook</Menu.Item>
                                <Menu.Item key="2" onClick={() => this.onMenuClick(1)} >Inline Hook</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Advanced Hook">
                                <Menu.Item key="3" onClick={() => this.onMenuClick(0)}>Native Hook</Menu.Item>
                                <Menu.Item key="4" onClick={() => this.onMenuClick(1)}>Inline Hook</Menu.Item>
                            </Menu.ItemGroup>

                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="android" />
                                    <span>Regitser</span>
                                </span>
                            }
                        >
                            <Menu.Item key="5" onClick={() => this.onMenuClick()}>Stack Trace</Menu.Item>
                            <Menu.Item key="6">Tracer</Menu.Item>

                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <Icon type="android" />
                                    <span>Unpack</span>
                                </span>
                            }
                        >
                            <Menu.Item key="9" onClick={() => this.onMenuClick(2)}>Ordinary Unpack</Menu.Item>
                            <Menu.Item key="10" onClick={() => this.onMenuClick()}>Advanced Unpack</Menu.Item>


                        </SubMenu>
                        <SubMenu
                            key="sub5"
                            title={
                                <span>
                                    <Icon type="android" />
                                    <span>Frida</span>
                                </span>
                            }
                        >
                            <Menu.Item key="12" onClick={() => this.onMenuClick()}>Process Func</Menu.Item>
                            <Menu.Item key="13" onClick={() => this.onMenuClick()}>Module Func</Menu.Item>
                            <Menu.Item key="14" onClick={() => this.onMenuClick()}>Memory Func</Menu.Item>
                            <Menu.ItemGroup key="15" title="Java Function" >
                                <Menu.Item key="1" onClick={() => this.onMenuClick(2)} >enumerateLoadedClasses</Menu.Item>
                                <Menu.Item key="2" onClick={() => this.onMenuClick(2)} >enumerateClassLoaders</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.Item key="16" onClick={() => this.onMenuClick()}>Interceptor Func</Menu.Item>

                        </SubMenu>
                    </Menu>
                </div>

                {/* change the style by ternary operator */}

                <div style={{ float: "left" }}>

                    {
                        this.state.tab == 0 ? (<div id='Native' style={{ border: "1px solid black", height: 450, width: 1000 }} visiable={this.state.visiable}>
                            <Input addonBefore="ClassName:" value={this.state.classname} onChange={e => this.setState({
                                classname: e.target.value
                            })} style={{ width: 600 }} size={"large"} />
                            <Input addonBefore="FuncName:" value={this.state.funcname} onChange={e => this.setState({
                                funcname: e.target.value
                            })} style={{ width: 600 }} size={"large"} />
                            <Input addonBefore="ProcessName:" value={this.state.processname} onChange={e => this.setState({
                                processname: e.target.value
                            })} style={{ width: 600 }} size={"large"} />
                            <Input.Search enterButton="Submit" addonBefore="EnLogCode:" value={this.state.enlogcode} onChange={e => this.setState({
                                enlogcode: e.target.value
                            })} style={{ width: 600 }} size={"large"} onSearch={this.onNativeHook.bind(this)} />
                            <div>{this.state.hkresp}</div>
                        </div>) : this.state.tab == 1 ? (<div id='Inline' style={{ border: "1px solid black", height: 450, width: 1000 }} visiable={this.state.visiable}>
                            <Input  addonBefore="ModuleName:" value={this.state.moduleName} onChange={e => this.setState({
                                moduleName: e.target.value
                            })} style={{ width: 400 }} size={"large"} />
                            <Input  addonBefore="ExportName:" value={this.state.exportName} onChange={e => this.setState({
                                exportName: e.target.value
                            })} style={{ width: 800 }} size={"large"} autosize={{ minRows: 2, maxRows: 6 }}/>
                            <Input  addonBefore="EnLogCode:" value={this.state.enlogcode} onChange={e => this.setState({
                                enlogcode: e.target.value
                            })} style={{ width: 400 }} size={"large"} />
                            <Input.Search enterButton="Submit" addonBefore="LeLogCode:" value={this.state.lelogcode} onChange={e => this.setState({
                                lelogcode: e.target.value
                            })} style={{ width: 600 }} size={"large"} onSearch={this.onInlineHook.bind(this)} />
                            <div>{this.state.hkresp}</div>
                        </div>

                        ) : this.state.tab == 2 ? (<div style={{ border: "1px solid black", height: 450, width: 1000 }} visiable={this.state.visiable}>
                            <Input.Search enterButton="Submit" addonBefore="ProcessName:" value={this.state.processname} onChange={e => this.setState({
                                processname: e.target.value
                            })} style={{ width: 600 }} size={"large"} onSearch={this.onOrUnpack.bind(this)} />
                            <div>{this.state.orresp}</div>
                        </div>) : (<div style={{ border: "1px solid black", height: 450, width: 1000 }} visiable={this.state.visiable}>
                            <Input.Search enterButton="Submit" addonBefore="ProcessName:" value={this.state.processname} onChange={e => this.setState({
                                processname: e.target.value
                            })} style={{ width: 600 }} size={"large"} onSearch={this.onAdUnpack.bind(this)} />
                            <div>{this.state.adresp}</div>
                        </div>)
                    }

                    <div style={{ float: "left" }}>
                        <button onClick={this.onGetProcess.bind(this)} >
                            GetProcess
            </button>
                        <button onClick={this.getData.bind(this)} >
                            DisplayData
            </button>
                        {/* <div>{this.state.presp}</div> */}
                        <Footer />
                    </div>



                </div>
            </div>

        );
    }
}


ReactDOM.render(<SiderDemo />, document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
