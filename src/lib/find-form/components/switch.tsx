import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: any[]
}
const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use('find-super-antd')
  let { Form, Switch } = antd
  const { item, listIndex }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      label={item.label}
      name={listIndex ? [...listIndex, item.name] : item.name}
      rules={[{
        required: item.required === false ? false : true,
        message: item.errMessage ? item.errMessage : `请输入${item.label}！`,
        // type: item.validateType,
      }]}
      valuePropName="checked"
    >
      <Switch
        disabled={item.disabled}
        checkedChildren={item.checkedChildren || ''}
        unCheckedChildren={item.unCheckedChildren || ''}
        defaultChecked={Array.isArray(item.value) ? true : false}
      />
    </Form.Item>
  )
}
export default Index;