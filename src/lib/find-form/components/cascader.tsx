import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React


const Index = (props) => {
  let { antd } = Packages.use()
  let { Form, Cascader } = antd
  const { item }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      name={item.name}
      label={item.label}
      rules={[
        {
          required: item.required === false ? false : true,
          message: item.errMessage ? item.errMessage : `请选择${item.label}！`
        },
      ]}
    >
      <Cascader
        placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
        options={item.options} />
    </Form.Item>
  )
}
export default Index;