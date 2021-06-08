import * as React from "react";
import Packages from '../../../utils/index';
import Validate from '../../../utils/validate';
import { NoValue } from '../../../utils/global-variable'
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: number[],
}

const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use()
  let { Form, Input } = antd
  const { item, listIndex }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      shouldUpdate
      label={item.label}
      name={listIndex ? [...listIndex, item.name] : item.name}
      rules={[{
        required: item.required === false ? false : true,
        message: item.errMessage ? item.errMessage : `请输入${item.label}！`
        // type: item.validateType,
      }]}
    >
      <Input.TextArea
        maxLength={item.maxLength || 10000}
        disabled={item.disabled}
        placeholder={item.disabled ? NoValue : item.placeholder ? item.placeholder : `请输入${item.label}`}
        autoSize={{ minRows: 6 }}
      />
    </Form.Item>
  )
}
export default Index;