import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React


const Index = (props) => {
  let { antd } = Packages.use('find-super-antd')
  let { Form, Input } = antd
  const { item}: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      label={item.label}
      name={item.name}
      rules={[{
        required: item.required === false ? false : true,
        message: item.errMessage ? item.errMessage : `请输入${item.label}！`,
        min: 6
      }]}
      hasFeedback
    >
      <Input.Password

        allowClear
        maxLength={item.maxLength || 10000}
        disabled={item.disabled}
        placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
      />
    </Form.Item>
  )
}
export default Index;