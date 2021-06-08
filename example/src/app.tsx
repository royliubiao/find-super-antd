import * as React from "react";

import { FindForm } from '../../src/index'
// import { TestComponent, FindForm } from 'find-antd'
const { useEffect, useState, useCallback } = React;


import { hot } from "react-hot-loader";

let App = () => {

    const [modal, setModal] = useState({
        formItems: [
            {
                name: 'input',
                label: '输入框',
                type: 'input',
                validateType: 'string',
            },
            {
                name: 'number',
                label: '数字',
                type: 'number',
            },
            {
                name: 'area',
                label: '地区',
                type: 'area',
            },
            {
                name: 'password',
                label: '密码',
                type: 'password',
            },
            {
                name: 'confirm',
                label: '确认密码',
                type: 'confirm',
                dependencies: 'password'
            },
            {
                name: 'tag-number',
                label: '标签-number',
                type: 'tag',
                valueType: 'number',
                childWidth: '25%',
                aline: true
            },
            {
                name: 'tag-string',
                label: '标签-string',
                type: 'tag',
                valueType: 'string',
                childWidth: '50%',
                aline: true
            },
            {
                name: 'phone',
                label: '手机号',
                type: 'phone',

            },
            {
                name: 'textarea',
                label: '文本框',
                type: 'textarea',
                aline: true

            },
            {
                name: 'select',
                label: '单选框',
                type: 'select',
                value: '',
                nameKey: 'name',
                valueKey: 'value',
                options: [
                    {
                        name: '上海',
                        value: 1
                    },
                    {
                        name: '北京',
                        value: 2
                    },
                ]

            },
            {
                name: 'multiple',
                label: '多选框',
                type: 'multiple',
                value: '',
                nameKey: 'name',
                valueKey: 'value',
                options: [
                    {
                        name: '上海',
                        value: 1
                    },
                    {
                        name: '北京',
                        value: 2
                    },
                ]

            },
            {
                name: 'cascader',
                label: '多选框',
                type: 'cascader',
                value: '',
                nameKey: 'name',
                valueKey: 'value',
                options: [
                    {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                            {
                                value: 'hangzhou',
                                label: 'Hangzhou',
                                children: [
                                    {
                                        value: 'xihu',
                                        label: 'West Lake',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: 'jiangsu',
                        label: 'Jiangsu',
                        children: [
                            {
                                value: 'nanjing',
                                label: 'Nanjing',
                                children: [
                                    {
                                        value: 'zhonghuamen',
                                        label: 'Zhong Hua Men',
                                    },
                                ],
                            },
                        ],
                    },
                ],
                aline: true

            },
            {
                name: 'radio',
                label: 'radio',
                type: 'radio',
                value: '',
                nameKey: 'name',
                valueKey: 'value',
                options: [
                    {
                        name: '上海',
                        value: 1
                    },
                    {
                        name: '北京',
                        value: 2
                    },
                ]

            },
            {
                name: 'checkbox',
                label: 'checkbox',
                type: 'checkbox',
                value: '',
                nameKey: 'name',
                valueKey: 'value',
                options: [
                    {
                        name: '上海',
                        value: 1
                    },
                    {
                        name: '北京',
                        value: 2
                    },
                ]

            },
            {
                name: 'switch',
                label: 'switch',
                type: 'switch',
                required: false,
            },
            {
                name: 'date',
                label: '日期',
                type: 'date',
            },
            {
                name: 'upload',
                label: '上传',
                type: 'upload',
            },
            {
                name: 'datePicker',
                label: '日期-datePicker',
                type: 'datePicker',
            },
            {
                name: 'timePicker',
                label: '时间-timePicker',
                type: 'timePicker',
            },
            {
                name: 'toptitle',
                label: '标题',
                type: 'toptitle',
                buttons: [
                    {
                        button: '确认',
                        type: 'primary',
                        action: () => console.log('toptitle')
                    }
                ]
            },
            {
                name: 'edit',
                type: 'edit',
                label: '富文本编辑器',
                aline: true
            },
            {
                name: 'treeselect',
                type: 'treeselect',
                label: 'tree-select',
                nameKey: 'name',
                valueKey: 'value',
                options: []
            },
            {
                name: 'rate',
                type: 'rate',
                label: '评分'
            },
            {
                name: 'attr',
                label: '默认规格',
                type: 'formList',
                valueType: 'arr',
                value: [
                ],
                childWidth: ['20%', '50%', '100%'],
                titleWidth: ['20%', '50%', '100%'],
                title: ['规格名'],
                aline: true,
                children: [
                    {
                        name: 'name',
                        type: 'input',
                        aline: true,
                        validateType: 'string',
                        placeholder: '规格名',
                        errMessage: "请输入规格名",
                        disabled: true,
                        switchDisabled: {
                            name: 'type',
                            value: 'other',
                            disabled: false
                        }
                    },
                    /** 需要新接口字段名支持 =====================================*/
                    {
                        name: 'courseType',
                        type: 'radio',
                        // label: '上课方式',
                        value: '',
                        nameKey: 'name',
                        valueKey: 'value',
                        options: [
                            {
                                value: 'outline',
                                name: '线下上课',
                            },
                            {
                                value: 'online',
                                name: '线上上课',
                            },
                        ],
                        relyOn: {
                            name: 'type',
                            value: 'course',
                        },
                        placeholder: '请选择上课方式',
                        errMessage: '请选择上课方式'
                    },
                    {
                        name: 'value',
                        type: 'formList',
                        childWidth: ['20%', '20%', '20%', '20%', '20%'],
                        valueType: 'arr',
                        addText: '添加规格值',
                        children: [
                            {
                                name: 'name',
                                label: '',
                                type: 'input',
                                validateType: 'string',
                                value: '',
                                placeholder: '规格值',
                                errMessage: "请输入规格值",
                            },
                            {
                                name: 'ncCode',
                                label: '',
                                type: 'input',
                                validateType: 'string',
                                value: '',
                                placeholder: 'NC物料编码',
                                errMessage: "请输入NC物料编码",
                                relyOn: {
                                    name: 'type',
                                    value: 'piano',
                                },
                                switchVisabled: {
                                    itemName: 'attr', //'attr',
                                    parentBortherName: 'key', //'name',
                                    hiddenValue: 'leaseMonth',
                                    relyOn: {
                                        name: 'type',
                                        value: 'piano'
                                    }
                                }
                            },
                            {
                                name: 'pianoModel',
                                label: '',
                                type: 'input',
                                validateType: 'string',
                                value: '',
                                placeholder: '钢琴型号',
                                errMessage: "请输入钢琴型号",
                            },
                            {
                                name: 'alias',
                                label: '',
                                type: 'input',
                                validateType: 'string',
                                value: '',
                                placeholder: '自定义规格名',
                                errMessage: "请输入自定义规格名",
                            },
                            {
                                name: 'productCover',
                                type: 'upload',
                                value: [],
                                uploadText: '上传图片',
                                errMessage: "请选择图片",
                                uploadValueType: 'key',
                                maxFileNum: 1,
                                options: [],
                                url: true,
                            },
                        ],
                    },
                    {
                        name: 'key',
                        type: 'input',
                        validateType: 'string',
                        visible: false,
                        required: false,
                    },
                ],
                addText: '添加规格',
            },
        ]
    })


    const submitForm = (data) => {
        console.log('submitForm------------', data)
    }


    return (
        <div className="p30">
            {/* 新增和编辑 */}
            <FindForm
                formName={'merchants-manage'}
                items={modal.formItems}
                submitText={'确认'}
                onSubmit={submitForm}
                hiddeCancel={true}
            ></FindForm>
        </div>
    );
};


export default App