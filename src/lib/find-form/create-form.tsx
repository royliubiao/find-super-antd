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
    let { antd } = Packages.use()
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
        // console.log('๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ-fields', fields)
        // console.log('๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ-items', readOnly)
        // console.log('๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ-getFields', readOnly)
        GetFormParent()
    }, [itemvisibles, fields, items, readOnly, area, areaArr])
    /** useRef */
    const FormContainer = useRef(null)
    /** ่กจๅ */
    const formItems = useMemo(() => items, [items])
    /** ่กจๅๅผ */
    const getFields = useMemo(() => fields, [fields])
    /** ๆพ็คบ็ปไปถ */
    const visibles = useMemo(() => itemvisibles, [itemvisibles])
    /** ๆฏๅฆๅคๅฑๅ่ฃน็modal็ปไปถ */
    const [isModal, setModal] = useState(false)
    /** ่ทๅform็ถ็บงๅฎนๅจไฟกๆฏ */
    const GetFormParent = () => {
        let parentClassName = FormContainer.current.offsetParent.className
        /** ๅฆๆ็ถ็บงๆฏmodal */
        if (parentClassName.indexOf('modal__component') !== -1) {
            setModal(true)
        }
        // console.log('๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ๐ถ-่ทๅform็ถ็บงๅฎนๅจไฟกๆฏ', FormContainer.current.offsetParent.className);
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
                                    key={index}
                                    sm={item.hidden ? 0 : 24}
                                    xl={item.hidden ? 0 : (item.type === 'toptitle' || item.aline || aline) ? 24 : 12}
                                    xxl={item.hidden ? 0 : (item.type === 'toptitle' || item.aline || aline) ? 24 : isModal ? 12 : 6}
                                >
                                    {/* input */}
                                    {item.type === 'input' && <FormInput item={item}></FormInput>}
                                    {/* password */}
                                    {item.type === 'password' && <FormPassWord item={item}></FormPassWord>}
                                    {/* ็กฎ่ฎคๅฏ็? */}
                                    {item.type === 'confirm' && <ConfirmFormPassWord item={item}></ConfirmFormPassWord>}
                                    {/*  ๆฐๅญ*/}
                                    {item.type === 'number' && <FormNumber item={item}></FormNumber>}
                                    {/* ๆ?็ญพ */}
                                    {item.type === 'tag' && <FormTag item={item}></FormTag>}
                                    {/*  ็ต่ฏ */}
                                    {item.type === 'phone' && <FormPhone item={item}></FormPhone>}
                                    {/* ๆๆฌๅ */}
                                    {item.type === 'textarea' && <FormTextArea item={item}></FormTextArea>}
                                    {/* ไธๆ้ๆฉๆก */}
                                    {item.type === 'select' && <FormSelect item={item}></FormSelect>}
                                    {/* ๅฐๅบ้ๆฉ */}
                                    {item.type === 'area' && <FormArea areaArr={areaArr} item={item} data={area} onChange={AreaChange}></FormArea>}
                                    {/* ไธๆ้ๆฉๆก ๅค้ๆฉๆก*/}
                                    {item.type === 'multiple' && <FormMultiple item={item}></FormMultiple>}
                                    {/* ่็บง้ๆฉๆก */}
                                    {item.type === 'cascader' && <FormCascader item={item}></FormCascader>}
                                    {/* ๅ้ */}
                                    {item.type === 'radio' && <FormRadio item={item}></FormRadio>}
                                    {/* ๅค้ */}
                                    {item.type === 'checkbox' && <FormCheckBox item={item}></FormCheckBox>}
                                    {/* ๅๆขๅผๅณ */}
                                    {item.type === 'switch' && <FormSwitch item={item}></FormSwitch>}
                                    {/* ไธไผ?ๆไปถ */}
                                    {item.type === 'upload' && <FormUpload item={item}></FormUpload>}
                                    {/* ๆถ้ด้ๆฉๅจ */}
                                    {item.type === 'date' && <FormDate item={item}></FormDate>}
                                    {/* ้ๆฉๆฅๆๆฎต */}
                                    {item.type === 'datePicker' && <FormDatePicker item={item}></FormDatePicker>}
                                    {/* ้ๆฉๆฅๆๆฎต */}
                                    {item.type === 'timePicker' && <FormTimePicker item={item}></FormTimePicker>}
                                    {/* ๆ?้ข */}
                                    {item.type === 'toptitle' && <TopTitle item={item}></TopTitle>}
                                    {/* ๅฆๆๆฏๅฏๆๆฌ็ผ่พๅจ */}
                                    {item.type === 'edit' && <FormEdit item={item}></FormEdit>}
                                    {/* ่ชๅฎไน็ปไปถ */}
                                    {item.type === 'component' && item.component()}
                                    {/* ๆ?ๅฝข้ๆฉๆก */}
                                    {item.type === 'treeselect' && <FormTreeSelect item={item}></FormTreeSelect>}
                                    {/* ่ฏๅ */}
                                    {item.type === 'rate' && <FormRate item={item}></FormRate>}
                                    {/*  ๅฆๆๆฏformList */}
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