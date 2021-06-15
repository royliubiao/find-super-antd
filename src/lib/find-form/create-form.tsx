import * as React from "react";
import {
    FormInput,
    FormNumber,
    FormArea,
    FormPassWord,
    ConfirmFormPassWord,
    FormTag,
    FormPhone,
    FormTextArea,
    FormSelect,
    FormMultiple,
    FormCascader,
    FormRadio,
    FormCheckBox,
    FormSwitch,
    FormDate,
    FormUpload,
    FormDatePicker,
    FormTimePicker,
    TopTitle,
    FormEdit,
    FormTreeSelect,
    FormRate,
    FormList
} from './components'
import './index.scss'
import { onlineForm, formItem } from './type'
import { useSelector, useDispatch } from 'react-redux';
import Packages from '../../utils'
const { useEffect, useState, memo, useMemo, useCallback, useRef } = React
type CreateForm = onlineForm & {
    onlineForm,
    created: boolean
    formName: string
    fields: any
    form: any
    area: {
        province: any[],
        city: any[],
        district: any[],
    }
    onFinish: () => void
    onFinishFailed: () => void
    onValuesChange: () => void
    onReset: () => void
    AreaChange: () => void
    itemvisibles: { [name: string]: boolean }
}
const Index = (props) => {
    let { antd } = Packages.use('find-super-antd')
    let {
        Form,
        Button,
        Row,
        Col } = antd
    let {
        items,
        created,
        layout,
        formName,
        fields,
        onFinish,
        onFinishFailed,
        onValuesChange,
        itemvisibles,
        aline,
        hiddeCancel,
        onReset,
        cancelText,
        hiddeSubmit,
        submitText,
        form,
        area,
        AreaChange,
        areaArr,
        readOnly
    } = props
    useEffect(() => {
        // console.log('🌶🌶🌶🌶🌶🌶🌶🌶🌶-fields', fields)
        // console.log('🌶🌶🌶🌶🌶🌶🌶🌶🌶-items', readOnly)
        // console.log('🌶🌶🌶🌶🌶🌶🌶🌶🌶-getFields', readOnly)
        GetFormParent()
    }, [itemvisibles, fields, items, readOnly, area, areaArr])
    /** useRef */
    const FormContainer = useRef(null)
    /** 表单 */
    const formItems = useMemo(() => items, [items])
    /** 表单值 */
    const getFields = useMemo(() => fields, [fields])
    /** 显示组件 */
    const visibles = useMemo(() => itemvisibles, [itemvisibles])
    /** 是否外层包裹着modal组件 */
    const [isModal, setModal] = useState(false)
    /** 获取form父级容器信息 */
    const GetFormParent = () => {
        let parentClassName = FormContainer.current.offsetParent.className
        /** 如果父级是modal */
        if (parentClassName.indexOf('modal__component') !== -1) {
            setModal(true)
        }
        // console.log('🌶🌶🌶🌶🌶🌶🌶🌶🌶-获取form父级容器信息', FormContainer.current.offsetParent.className);
    }



    return (
        <div
            className="onlne__form"
            ref={FormContainer}
        >
            {
                (formItems && formItems.length > 0) &&
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    layout={'vertical'}
                    form={form}
                    labelAlign='left'
                    name={formName}
                    fields={getFields}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError={true}
                    onValuesChange={onValuesChange}
                >
                    <Row
                        // className="df jcsb ais fw"
                        gutter={[30, 0]}
                    >
                        {
                            formItems.map((item, index) =>
                                visibles[item.name] && <Col
                                    // className={`
                                    //   ${(item.aline || aline) ? 'w100' : 'w50'}  
                                    //   ${item.hidden && 'item_hidden'}
                                    // `}
                                    // span={item.type === 'toptitle' ? 24 : 12}
                                    key={item.name + index}
                                    sm={item.hidden ? 0 : 24}
                                    xl={item.hidden ? 0 : (item.type === 'toptitle' || item.aline || aline) ? 24 : 12}
                                    xxl={item.hidden ? 0 : (item.type === 'toptitle' || item.aline || aline) ? 24 : isModal ? 12 : 6}
                                >
                                    {/* input */}
                                    {item.type === 'input' && <FormInput item={item}></FormInput>}
                                    {/*  数字*/}
                                    {item.type === 'number' && <FormNumber item={item}></FormNumber>}
                                    {/* password */}
                                    {item.type === 'password' && <FormPassWord item={item}></FormPassWord>}
                                    {/* 确认密码 */}
                                    {item.type === 'confirm' && <ConfirmFormPassWord item={item}></ConfirmFormPassWord>}
                                    {/* 标签 */}
                                    {item.type === 'tag' && <FormTag item={item}></FormTag>}
                                    {/*  电话 */}
                                    {item.type === 'phone' && <FormPhone item={item}></FormPhone>}
                                    {/* 文本域 */}
                                    {item.type === 'textarea' && <FormTextArea item={item}></FormTextArea>}
                                    {/* 下拉选择框 */}
                                    {item.type === 'select' && <FormSelect item={item}></FormSelect>}
                                    {/* 下拉选择框 多选择框*/}
                                    {item.type === 'multiple' && <FormMultiple item={item}></FormMultiple>}
                                    {/* 联级选择框 */}
                                    {item.type === 'cascader' && <FormCascader item={item}></FormCascader>}
                                    {/* 地区选择 */}
                                    {item.type === 'area' && <FormArea areaArr={areaArr} item={item} data={area} onChange={AreaChange}></FormArea>}
                                    {/* 单选 */}
                                    {item.type === 'radio' && <FormRadio item={item}></FormRadio>}
                                    {/* 多选 */}
                                    {item.type === 'checkbox' && <FormCheckBox item={item}></FormCheckBox>}
                                    {/* 切换开关 */}
                                    {item.type === 'switch' && <FormSwitch item={item}></FormSwitch>}
                                    {/* 上传文件 */}
                                    {item.type === 'upload' && <FormUpload item={item}></FormUpload>}
                                    {/* 时间选择器 */}
                                    {item.type === 'date' && <FormDate item={item}></FormDate>}
                                    {/* 选择日期段 */}
                                    {item.type === 'datePicker' && <FormDatePicker item={item}></FormDatePicker>}
                                    {/* 选择日期段 */}
                                    {item.type === 'timePicker' && <FormTimePicker item={item}></FormTimePicker>}
                                    {/* 标题 */}
                                    {item.type === 'toptitle' && <TopTitle item={item}></TopTitle>}
                                    {/* 如果是富文本编辑器 */}
                                    {item.type === 'edit' && <FormEdit item={item}></FormEdit>}
                                    {/* 自定义组件 */}
                                    {item.type === 'component' && item.component()}
                                    {/* 树形选择框 */}
                                    {item.type === 'treeselect' && <FormTreeSelect item={item}></FormTreeSelect>}
                                    {/* 评分 */}
                                    {item.type === 'rate' && <FormRate item={item}></FormRate>}
                                    {/*  如果是formList */}
                                    {item.type === 'formList' && <FormList readOnly={readOnly} parentValue={item.value} item={item}></FormList>}
                                </Col>
                            )
                        }
                    </Row>
                    {/* <Form.Item> */}
                    <div className="df aic jcc w100 pt30">
                        {
                            !hiddeCancel &&
                            <div className='pr20'>
                                <Button type="default" htmlType="button" onClick={onReset}>
                                    {cancelText}
                                </Button>
                            </div>
                        }
                        {
                            !hiddeSubmit && !readOnly && <Button type="primary" htmlType="submit">
                                {submitText}
                            </Button>
                        }
                    </div>
                </Form>
            }
        </div>
    )
}
export default memo(Index);






