
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { TestComponent } from '../../src/index'
// import './app.scss';
// import { ConfigProvider } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
// const rootElement = document.getElementById('main')

// ReactDOM.render(
//     <ConfigProvider locale={zhCN}>
//         <TestComponent />
//     </ConfigProvider>
//     ,
//     rootElement
// )



import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import moment from 'moment'
// import * as Sentry from '@sentry/browser';
import {
    ConfigProvider,
    Input,
    Form,
    message,
    Button,
    Row,
    Col,
    InputNumber,
    Select,
    Cascader,
    Radio,
    Checkbox,
    Switch,
    DatePicker,
    Upload,
    Modal,
    TimePicker,
    TreeSelect,
    Rate
} from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { useDebouncedCallback } from 'use-debounce';
import zhCN from 'antd/es/locale/zh_CN';
import './app.scss';
import { Packages } from '../../dist/index'
// import Packages from 'find-antd'
const { useEffect, useState, useCallback } = React;
const rootElement = document.getElementById('main')

let Api = {};

// console.log('Packages', Packages)

Packages.bind('find-super-antd', {
    antd: {
        Input,
        Form,
        message,
        Button,
        Row,
        Col,
        InputNumber,
        Select,
        Cascader,
        Radio,
        Checkbox,
        Switch,
        DatePicker,
        Upload,
        Modal,
        TimePicker,
        TreeSelect,
        Rate
    },
    BraftEditor,
    moment,
    Api,
    useDebouncedCallback,
    UploadUrl: 'https://up.qiniup.com',
    // GetPrivateToken: 'xxxxx',
    // GetToken: 'xxxxx',
})

// }
// document.onreadystatechange = listen
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
    rootElement
)