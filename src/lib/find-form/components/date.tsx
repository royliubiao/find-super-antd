import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: any[]
}
const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use('find-super-antd')
  let { Form, DatePicker } = antd
  const { item, listIndex }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      shouldUpdate
      label={item.label}
      name={listIndex ? [...listIndex, item.name] : item.name}
      rules={[
        {
          required: item.required === false ? false : true,
          message: item.errMessage ? item.errMessage : `请选择${item.label}！`
        },
      ]}
      wrapperCol={{
        xs: { span: 16 },
        sm: { span: 24 },
      }}
    >
      <DatePicker
        showTime={item.showTime ? { format: 'YYYY-MM-DD HH:mm:ss' } : false}
        disabled={item.disabled}
        format={item.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
        disabledDate={item.disabledDate}
      />
    </Form.Item>
  )
}
export default Index;