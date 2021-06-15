import * as React from "react";
// import { Form, Input, Button, Select, InputNumber, Checkbox, Row, Col, Switch } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    FormInput,
    FormPassWord,
    ConfirmFormPassWord,
    FormNumber,
    FormTag,
    FormPhone,
    FormTextArea,
    FormSelect,
    FormArea,
    FormMultiple,
    FormCascader,
    FormRadio,
    FormCheckBox,
    FormDate,
    FormUpload,

    TopTitle,
    FormSwitch,
    FormList,
} from './index'
import Packages from '../../../utils/index';
import { UpdateFormItem } from '../scripts/form'
const { useEffect, useState, memo, useMemo, useCallback } = React


interface formList {
    item: any,
    listIndex?: string[],
    parentValue?: any,
    readOnly?: boolean,
    names?: any[],
}


const Index: React.FC<formList> = (props) => {
    let { antd, } = Packages.use('find-super-antd')
    let { Form, Input, Button, InputNumber, Checkbox, Switch } = antd
    const { item, listIndex, parentValue, readOnly, names }: any = {
        childrenNames: [],
        item: {},
        ...props,
    }


    const [childItem, setChild] = useState({

    })

    /** 父级item的名称
     * 目前支持到2层嵌套
     */

    //缓存formList层级name及其他数据
    const [listLayer, setListLayer] = useState({
        names: [],//层级名称
    })


    /** 给子item设置disabled */
    const setChildDisabled = (list) => {

        let newList = Object.assign({}, list)

        if ((readOnly || newList.disabled && newList.children && newList.children.length)) {
            newList.children.map(child => {
                return {
                    ...child,
                    disabled: true
                }
            })
        }
        return newList
    }

    /** item */
    const listItem: any = useMemo(() => item, [item])

    /** 缓存父级value */
    useEffect(() => {

        //如果是多层嵌套
        if (names && names.length > 0) {
            setListLayer({ ...listLayer, names: names })
        } else {
            setListLayer({ ...listLayer, names: [item.name] })
        }
        // console.log('formList', item.name, listIndex, parentName)
    }, [item])





    /** 创建formList */
    const CreateFormListByItems = useCallback(() => {

        return (
            <>
                {/* 如果是数组类型 */}
                {
                    listItem.valueType === 'arr' &&
                    <CreateArrFormList
                        item={listItem}
                    ></CreateArrFormList>
                }
                {/* 如果是对象类型 */}
                {
                    listItem.valueType === 'obj' &&
                    <CreateObjectFormList
                        item={listItem}
                    ></CreateObjectFormList>
                }
            </>
        )
    }, [item])

    /** 
    * 子选项是否显示
    */
    const childVisabel = (parent: any, child: any, listIndex: number) => {
        let list: any = { ...child }
        /** 如果有childVisables */
        if (parent.childVisables) {
            let { type, names } = parent.childVisables
            setChild(child)
            list = { ...childItem }
            /** 
             * @desc item.childVisables.type  all = 全部 list = 根据下标
             */
            //全部
            //根据下标来隐藏
            if ((type === 'list' && names.includes(child.name) && parent.childVisables.index.includes(listIndex)) || //根据下标
                (type === 'all' && names.includes(child.name)) //全部
            ) {
                let { hidden } = parent.childVisables
                //当前下标
                let newChildren = []
                list.children && list.children.map((nitem, nindex) => {
                    let newChild = { ...nitem }
                    if (hidden.includes(newChild.name)) {
                        newChild = {
                            ...newChild,
                            visible: false
                        }
                    }

                    newChildren.push(newChild)
                })
                list.children = newChildren && [...newChildren]

            }
            // console.log("子选项是否显示---------------1", parent, list, listIndex)
        }
        return list
    }


    /** 
         * 将ObjectList中的子元素 抽出来 单独分装
         */

    const ObjDefaultChild = (props) => {
        const { oldChild, cindex, index, field, item } = props
        const { relyOn, switchDisabled, switchRequired, setLabel } = oldChild
        /** 过滤上传文件的路劲资源 */
        // const filterFileList: any = (name) => {
        //     let file = [] || {}
        //     let value = Array.isArray(parentValue) ? parentValue ? [...parentValue] : null : parentValue ? { ...parentValue } : null
        //     /** 如果是子级list */
        //     if (listIndex && value) {
        //         listIndex.map((pitem, idnex) => {
        //             value = value[pitem]
        //             // console.log('如果是子级list,', file, pitem)
        //         })
        //         value = value && item.name && name && value[item.name][name]
        //         file = value ? [...value] : []
        //     }
        //     console.log('filterFileList', parentValue)
        //     return file
        // }
        // console.log('将ObjectList中的子元素------', item)
        return (
            <>
                {
                    relyOn ? <Form.Item
                        noStyle
                        // dependencies={[null]}
                        shouldUpdate
                    >
                        {
                            ({ getFieldValue }) => {
                                let child = { ...oldChild }
                                /** 如果有依赖项 */
                                if (relyOn && relyOn.type === 'formList' && getFieldValue([item.name, field.key, ...relyOn.name]) === relyOn.value) {
                                    child.visible = true
                                    // console.log('如果有依赖项', getFieldValue([item.name, field.key, ...relyOn.name]))
                                }
                                return UpdateFormItem(child, [item.name], [field.key], getFieldValue, listIndex, [...listLayer.names, field.name]) ? <div
                                    className={`pr20 w25 psr ${child.direction === 'row' && 'df jcs ais'}`}
                                    style={{
                                        width: item.childWidth ? Array.isArray(item.childWidth) ? item.childWidth[cindex] ? item.childWidth[cindex] : item.childWidth[cindex - 1] : item.childWidth : '100%',
                                    }}
                                >
                                    {/* gruoptitle */}
                                    {item.groupTitle && item.groupTitle.length > 0 &&
                                        <p className="fl1 pb10 fw5" >{item.groupTitle[cindex]}</p>
                                    }
                                    {/* input */}
                                    {child.type === 'input' && <FormInput parentsNames={[...listLayer.names, field.name]} listIndex={[field.name]} item={child}></FormInput>}
                                    {/* textArea */}
                                    {child.type === 'textarea' && <FormTextArea listIndex={[field.name]} item={child}></FormTextArea>}
                                    {/* switch */}
                                    {child.type === 'switch' && <FormSwitch listIndex={[field.name]} item={child}></FormSwitch>}
                                    {/*  数字*/}
                                    {child.type === 'number' && <FormNumber parentsNames={[...listLayer.names, field.name]} listIndex={[field.name]} item={child} ></FormNumber>}
                                    {/* 下拉选择框 */}
                                    {child.type === 'select' && <FormSelect listIndex={[field.name]} item={child}></FormSelect>}
                                    {/* tag */}
                                    {child.type === 'tag' && <FormTag listIndex={[field.name]} item={child}></FormTag>}
                                    {/* checkBox */}
                                    {child.type === 'checkbox' && <FormCheckBox listIndex={[field.name]} item={child}></FormCheckBox>}
                                    {/* radio */}
                                    {child.type === 'radio' && <FormRadio listIndex={[field.name]} item={child}></FormRadio>}
                                    {/* 日期 */}
                                    {child.type === 'date' && <FormDate listIndex={[field.name]} item={child}></FormDate>}
                                    {/* 上传文件 */}
                                    {child.type === 'upload' &&
                                        <FormUpload
                                            // fileList={filterFileList(child.name)}
                                            listIndex={[field.name]}
                                            item={child}
                                        ></FormUpload>
                                    }
                                    {/* 如果是多层嵌套 */}
                                    {child.type === 'formList' &&
                                        <FormList
                                            item={childVisabel(item, child, index)}
                                            listIndex={[field.name]}
                                            readOnly={readOnly}
                                            names={[...listLayer.names, field.name, child.name]}
                                        ></FormList>
                                    }
                                </div> : null
                            }
                        }

                    </Form.Item> : <Form.Item
                        noStyle
                        // shouldUpdate
                        // dependencies={oldChild.dependencies ? [oldChild.dependencies, 0, 'delete'] : [null]}
                        dependencies={[null]}
                    >
                        {
                            ({ getFieldValue }) => {

                                let child = { ...oldChild }

                                /** 如果有setlabel */
                                if (child.setLabel && getFieldValue([setLabel && setLabel.itemName, listIndex, setLabel && setLabel.parentName, field.key, setLabel && setLabel.labelName])) {
                                    child.label = getFieldValue([setLabel && setLabel.itemName, listIndex, setLabel && setLabel.parentName, field.key, setLabel && setLabel.labelName])
                                }

                                /** 如果有切换disabled */
                                if (switchDisabled && getFieldValue(switchDisabled.name) === switchDisabled.value) {
                                    child.disabled = switchDisabled.disabled
                                    // console.log('如果有切换disabled', getFieldValue(switchDisabled.name))
                                }

                                /** 如果有切换required */
                                if (switchRequired) {

                                    if (switchRequired.bortherName == undefined && getFieldValue(switchRequired.name) === switchRequired.value) {
                                        child.required = switchRequired.required
                                    }
                                    //如果关联同层级
                                    if (switchRequired.bortherName && getFieldValue(switchRequired && switchRequired.name)[field.key][switchRequired.bortherName] === switchRequired.value) {
                                        child.required = switchRequired.required
                                    }
                                    //如果关联上一层 说明是多层formList
                                    if (switchRequired.parentBortherName && getFieldValue(switchRequired && switchRequired.name)[listIndex][switchRequired.parentBortherName] === switchRequired.value) {
                                        child.required = switchRequired.required
                                    }
                                    // console.log('如果有切换required',field, getFieldValue([switchRequired && switchRequired.name, field && field.key, switchRequired && switchRequired.bortherName]))
                                }

                                return UpdateFormItem(child, [item.name], [field.key], getFieldValue, listIndex, [...listLayer.names, field.name]) ? <div
                                    className={`pr20 w25 psr ${child.direction === 'row' && 'df jcs ais'}`}
                                    style={{
                                        width: item.childWidth ? Array.isArray(item.childWidth) ? item.childWidth[cindex] ? item.childWidth[cindex] : item.childWidth[cindex - 1] : item.childWidth : '100%',
                                    }}
                                >
                                    {/* gruoptitle */}
                                    {item.groupTitle && item.groupTitle.length > 0 &&
                                        <p className="fl1 pb10 fw5" >{item.groupTitle[cindex]}</p>
                                    }
                                    {/* 日期 */}
                                    {child.type === 'date' && <FormDate listIndex={[field.name]} item={child}></FormDate>}
                                    {/* input */}
                                    {child.type === 'input' && <FormInput parentsNames={[...listLayer.names, field.name]} listIndex={[field.name]} item={child}></FormInput>}
                                    {/* switch */}
                                    {child.type === 'switch' && <FormSwitch listIndex={[field.name]} item={child}></FormSwitch>}
                                    {/*  数字*/}
                                    {child.type === 'number' && <FormNumber parentsNames={[...listLayer.names, field.name]} listIndex={[field.name]} item={child} ></FormNumber>}
                                    {/* 下拉选择框 */}
                                    {child.type === 'select' && <FormSelect listIndex={[field.name]} item={child}></FormSelect>}
                                    {/* tag */}
                                    {child.type === 'tag' && <FormTag listIndex={[field.name]} item={child}></FormTag>}
                                    {/* checkBox */}
                                    {child.type === 'checkbox' && <FormCheckBox listIndex={[field.name]} item={child}></FormCheckBox>}
                                    {/* radio */}
                                    {child.type === 'radio' && <FormRadio listIndex={[field.name]} item={child}></FormRadio>}

                                    {/* 上传文件 */}
                                    {child.type === 'upload' &&
                                        <FormUpload
                                            // fileList={filterFileList(child.name)}
                                            listIndex={[field.name]}
                                            item={child}
                                        ></FormUpload>
                                    }
                                    {/* 如果是多层嵌套 */}
                                    {child.type === 'formList' &&
                                        <FormList
                                            item={childVisabel(item, child, index)}
                                            listIndex={[field.name]}
                                            readOnly={readOnly}
                                            names={[...listLayer.names, field.name, child.name]}
                                        ></FormList>
                                    }
                                </div> : null
                            }
                        }

                    </Form.Item>
                }
            </>
        )
    }

    /** 创建FormList */
    const ObjectList = (props) => {
        const { item, fields, onDelete } = props

        return (
            <>

                {
                    fields && fields.map((field, index) => (
                        <Form.Item
                            key={field.key}
                            wrapperCol={{
                                span: 24
                            }}
                        >
                            <div className="input__group__outer df jcsb ais">
                                {/* <item.Group > */}
                                <div className={`df jcs ais  w100 fw ${!listIndex && 'form__list__bottom__border'} `}>
                                    {/* <p>{JSON.stringify(field)}</p> */}
                                    {/* formitem */}
                                    {
                                        item && item.children && item.children.length > 0 &&
                                        item.children.map((child, cindex) => {
                                            let newChild = { ...child }
                                            if (item.disabled) {
                                                newChild.disabled = true
                                            }
                                            return (
                                                <ObjDefaultChild
                                                    key={cindex}
                                                    item={item}
                                                    oldChild={newChild}
                                                    cindex={cindex}
                                                    index={index}
                                                    field={field}
                                                ></ObjDefaultChild>

                                            )
                                        }
                                        )
                                    }

                                </div>
                                {/* 清除当前行按钮 */}
                                {
                                    !readOnly && fields && fields.length > 0 && item.delete ?
                                        <div className="pt10">
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button fz18"
                                                onClick={() => onDelete(field.name)}
                                            />
                                        </div>
                                        : null
                                }
                            </div>

                        </Form.Item>
                    ))
                }
            </>
        )
    }

    /** 创建普通FormList */
    const ArrList = (props) => {
        const { fields, onDelete, child } = props
        return (
            // group
            <div className="input__group__outer df jcs aic fw w100">
                {fields.map((field, index) => (
                    <div key={index} className={'pr20 w25 psr df jcsb aic'} style={{ width: child.childWidth || '100%' }}>
                        <Form.Item
                            key={field.key}
                            style={{ width: "100%" }}
                        >
                            {/* <p>{JSON.stringify(onDelete)}</p> */}
                            <div className="df jcsb ais">
                                {/* input */}
                                {
                                    child.childType === 'input' &&
                                    <Form.Item
                                        {...field}
                                        rules={[{
                                            required: child.required === false ? false : true,
                                            message: child.errMessage ? child.errMessage : `请添加${child.label}`,
                                            type: child.validateType,
                                        }]}
                                        style={{ width: "100%" }}
                                    >

                                        <Input disabled={child.disabled} placeholder={child.placeholder ? child.placeholder : `请添加${child.label}`} style={{ marginRight: 8 }} />
                                    </Form.Item>
                                }
                                {/* number */}
                                {
                                    child.childType === 'number' &&
                                    <Form.Item
                                        {...field}
                                        rules={[{
                                            required: child.required === false ? false : true,
                                            message: child.errMessage ? child.errMessage : `请添加${child.label}`,
                                        }]}
                                        style={{ width: "100%" }}
                                    >

                                        <InputNumber style={{ width: '100%' }} min={child.min} max={child.max} step={child.step} disabled={child.disabled}
                                            placeholder={child.placeholder ? child.placeholder : `请输入${child.label}`}
                                        />
                                    </Form.Item>
                                }
                                {/* checkBox */}
                                {
                                    child.childType === 'checkbox' &&
                                    <Form.Item
                                        {...field}
                                        rules={[{
                                            required: child.required === false ? false : true,
                                            message: child.errMessage ? child.errMessage : `请添加${child.label}`,
                                        }]}
                                        style={{ width: "100%" }}
                                    >

                                        <Checkbox.Group style={{ width: '100%' }}>
                                            {
                                                item.options && item.options.map((citem, cindex) =>
                                                    <div className="pt10 pb10" key={cindex} >
                                                        <Checkbox
                                                            disabled={item.disabled}
                                                            value={citem[item.valueKey]}
                                                        >{citem[item.nameKey]}</Checkbox>
                                                    </div>
                                                )
                                            }
                                        </Checkbox.Group>
                                    </Form.Item>
                                }
                                {/* 切换 */}
                                {
                                    child.childType === 'switch' && item.options &&
                                    <div>
                                        {
                                            item.options.map((citem, cindex) =>
                                                <div className="df jcs ais" key={cindex} >
                                                    {/* <p>{JSON.stringify(field)}</p> */}
                                                    < Form.Item
                                                        // {...field}
                                                        name={[index, cindex]}
                                                        rules={[{
                                                            required: child.required === false ? false : true,
                                                            message: child.errMessage ? child.errMessage : `请添加${child.label}`,
                                                        }]}
                                                        style={{ width: "100%" }}
                                                        valuePropName="checked"
                                                    >
                                                        <Switch
                                                            disabled={item.disabled}
                                                            checkedChildren={item.checkedChildren || ''}
                                                            unCheckedChildren={item.unCheckedChildren || ''}

                                                        />
                                                    </Form.Item>
                                                    <span className={"pt10 pl10"}>{citem[item.nameKey]}</span>
                                                </div>
                                            )
                                        }
                                    </div>


                                }
                                {/* 清除当前行按钮 */}
                                {
                                    !readOnly && fields.length > 1 && child.delete ? (
                                        child.delete &&
                                        <div className="pt10 pl20">
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button fz18"
                                                onClick={() => {
                                                    onDelete(field.name);
                                                }}
                                            />
                                        </div>
                                    ) : null
                                }
                            </div>
                        </Form.Item>
                    </div>
                ))
                }
            </div >
        )
    }

    /** 创建数据接口是Arr的表单list */
    const CreateArrFormList = (props) => {
        const { item } = props
        return (
            <div className={`${item.childStyle === 'line' && 'df jcs aic'}`}>
                <Form.List
                    name={listIndex ? [...listIndex, item.name] : item.name}
                >
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {/* label */}
                                {
                                    item.visible !== false && item.label && <p className="label fw5">
                                        {item.required !== false && <span className='fcred'>* </span>}
                                        <span className="fz18 fw5">{item.label}</span>
                                    </p>
                                }
                                {/* 如果有title */}
                                {
                                    item.visible !== false && item.title && item.title.length > 0 &&
                                    <div className="df jcs aic">
                                        {
                                            item.title.map((titem, tindex) =>
                                                <p
                                                    className="pb10 fwbd"
                                                    style={{
                                                        width: item.titleWidth ? Array.isArray(item.titleWidth) ? item.titleWidth[tindex] : item.titleWidth : '25%',
                                                    }}
                                                    key={tindex}
                                                >{titem}</p>
                                            )
                                        }
                                    </div>
                                }
                                {/* 如果是对象 */}
                                {
                                    item.children &&
                                    <ObjectList
                                        item={item}
                                        fields={fields}
                                        onDelete={remove}
                                    ></ObjectList>
                                }
                                {/* 如果是数组 */}
                                {
                                    !item.children &&
                                    <ArrList
                                        child={item}
                                        fields={fields}
                                        onDelete={remove}
                                    ></ArrList>
                                }
                                {
                                    (!readOnly) && (item.addButton === false ? false : true) && <Form.Item>
                                        <Button
                                            type='primary'
                                            onClick={() => add()}
                                            // style={{ width: '0%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            {item.addText}
                                        </Button>
                                    </Form.Item>
                                }
                            </>
                        )
                    }}
                </Form.List >

            </div>
        )
    }

    /** 创建数据类型是对象的表单list */
    const CreateObjectFormList = (props) => {
        const { item } = props
        /** 过滤上传文件的路劲资源 */
        const filterFileList: any = (name) => {
            let file = [] || {}
            let value = Array.isArray(parentValue) ? parentValue ? [...parentValue] : null : parentValue ? { ...parentValue } : null
            /** 如果是子级list */
            if (listIndex && value) {
                listIndex.map((pitem, idnex) => {
                    value = value[pitem]
                })
                value = value[item.name][name]
                file = value ? [...value] : []
            }
            // console.log('name', listIndex, item.name, name, file)
            return file
        }

        return (
            <>
                {item.visible !== false && item.label && <p className="label">
                    <span className='fcred'>* </span>{item.label}
                </p>}
                {/* 如果有title */}
                {
                    item.visible !== false && item.title && item.title.length > 0 &&
                    <div className="df jcs aic">
                        {
                            item.title.map((titem, tindex) =>
                                <p className="pb10 fwbd" style={{ width: item.titleWidth || '25%' }} key={tindex}>{titem}</p>
                            )
                        }
                    </div>
                }
                {
                    //dataType = 'obj'
                    item.dataType === 'obj' ?
                        <div className={`df jcs ais  w100 fw`}>
                            {/* gruoptitle */}
                            {/* {item.groupTitle && item.groupTitle.length > 0 &&
                                <p className="fl1 pb10 fw5" >{item.groupTitle[index]}</p>
                            } */}
                            {/* formitem */}
                            {
                                item && item.children && item.children.length > 0 &&
                                item.children.map((child, cindex) =>
                                    //child-item
                                    child.visible !== false && <div
                                        key={cindex}
                                        className={'pr20 w25 psr'}
                                        style={{
                                            width: item.childWidth ? Array.isArray(item.childWidth) ? item.childWidth[cindex] : item.childWidth : '100%',
                                        }}
                                    >
                                        {/* input */}
                                        {child.type === 'input' && <FormInput listIndex={listIndex ? [...listIndex, item.name] : item.name} item={child}></FormInput>}
                                        {/*  数字*/}
                                        {child.type === 'number' && <FormNumber listIndex={listIndex ? [...listIndex, item.name] : item.name} item={child} ></FormNumber>}
                                        {/* 下拉选择框 */}
                                        {child.type === 'select' && <FormSelect listIndex={listIndex ? [...listIndex, item.name] : item.name} item={child}></FormSelect>}
                                        {/* tag */}
                                        {child.type === 'tag' && <FormTag listIndex={listIndex ? [...listIndex, item.name] : item.name} item={child}></FormTag>}
                                        {/* checkBox */}
                                        {child.type === 'checkbox' && <FormCheckBox listIndex={listIndex ? [...listIndex, item.name] : item.name} item={child}></FormCheckBox>}
                                        {/* textarea */}
                                        {child.type === 'textarea' && <FormTextArea listIndex={listIndex ? [...listIndex, item.name] : item.name} item={child}></FormTextArea>}
                                        {/* 上传文件 */}
                                        {child.type === 'upload' &&
                                            <FormUpload
                                                // fileList={filterFileList(child.name)}
                                                listIndex={listIndex ? [...listIndex, item.name] : item.name}
                                                item={child}
                                            ></FormUpload>
                                        }
                                        {/* 如果是多层嵌套 */}
                                        {child.type === 'formList' &&
                                            <FormList
                                                item={childVisabel(item, child, cindex)}
                                                listIndex={listIndex ? [...listIndex, item.name] : item.name}
                                                readOnly={readOnly}
                                            ></FormList>}
                                    </div>
                                )
                            }

                        </div>
                        : item.dataType === 'string' ?
                            <div
                                className={`df jcs ais  w100 fw`}
                            >
                                {
                                    item && item.children && item.children.length > 0 &&
                                    item.children.map((child, cindex) =>
                                        //child-item
                                        child.visible !== false && <div
                                            key={cindex}
                                            className={'pr20 w25 psr'}
                                            style={{
                                                width: item.childWidth ? Array.isArray(item.childWidth) ? item.childWidth[cindex] : item.childWidth : '100%',
                                            }}
                                        >
                                            {/* input */}
                                            {child.type === 'input' && <FormInput listIndex={[item.name]} item={child}></FormInput>}
                                            {/* phone */}
                                            {child.type === 'phone' && <FormPhone listIndex={[item.name]} item={child}></FormPhone>}
                                            {/*  数字*/}
                                            {child.type === 'number' && <FormNumber listIndex={[item.name]} item={child} ></FormNumber>}
                                            {/* 下拉选择框 */}
                                            {child.type === 'select' && <FormSelect listIndex={[item.name]} item={child}></FormSelect>}
                                            {/* tag */}
                                            {child.type === 'tag' && <FormTag listIndex={[item.name]} item={child}></FormTag>}
                                            {/* checkBox */}
                                            {child.type === 'checkbox' && <FormCheckBox listIndex={[item.name]} item={child}></FormCheckBox>}
                                            {/* textarea */}
                                            {child.type === 'textarea' && <FormTextArea listIndex={[item.name]} item={child}></FormTextArea>}
                                            {/* 上传文件 */}
                                            {child.type === 'upload' &&
                                                <FormUpload
                                                    // fileList={filterFileList(child.name)}
                                                    listIndex={[item.name]}
                                                    item={child}
                                                ></FormUpload>
                                            }
                                            {/* 如果是多层嵌套 */}
                                            {child.type === 'formList' &&
                                                <FormList
                                                    item={childVisabel(item, child, cindex)}
                                                    listIndex={[item.name]}
                                                    readOnly={readOnly}
                                                ></FormList>}
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <div className={`${listItem.groupWidth && 'df jcs ais'}`}>
                                {/* value是数组 */}
                                {
                                    item && item.children && item.children.length > 0 &&
                                    listItem.children.map((child, cindex) =>
                                        <div key={cindex} style={{ width: listItem.groupWidth ? listItem.groupWidth : '100%' }}>
                                            <Form.Item
                                                name={listIndex ? [...listIndex, item.name] : item.name}
                                                wrapperCol={{
                                                    span: 24
                                                }}
                                            >
                                                <Form.List
                                                    name={[listItem.name, child.name]}
                                                >
                                                    {(fields, { add, remove }) => {
                                                        return (
                                                            <ArrList
                                                                child={child}
                                                                fields={fields}
                                                                onDelete={remove}
                                                            ></ArrList>
                                                        );
                                                    }}
                                                </Form.List >
                                            </Form.Item>
                                        </div>

                                    )
                                }
                            </div>
                }
            </>
        )
    }
    /** ==================================================================== */
    // return (

    //     <CreateFormListByItems></CreateFormListByItems>
    // )

    return (
        <>
            {/* 如果是数组类型 */}
            {
                listItem.valueType === 'arr' &&
                <CreateArrFormList
                    item={listItem}
                ></CreateArrFormList>
            }
            {/* 如果是对象类型 */}
            {
                listItem.valueType === 'obj' &&
                <CreateObjectFormList
                    item={listItem}
                ></CreateObjectFormList>
            }
        </>
    )
}
export default memo(Index);


