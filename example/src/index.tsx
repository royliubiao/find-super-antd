
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
import { useDebouncedCallback } from 'use-debounce';
import zhCN from 'antd/es/locale/zh_CN';
import './app.scss';
import Packages from '../../src/index'
// import Packages from 'find-antd'
const { useEffect, useState, useCallback } = React;
const rootElement = document.getElementById('main')

let Api = {};

Packages.bind({
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
    UploadUrl: 'https://up.qiniup.com'
})

// }
// document.onreadystatechange = listen
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
    rootElement
)