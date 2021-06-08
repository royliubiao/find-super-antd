import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: any[]
}
const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use()
  let { Form, DatePicker } = antd
  const { RangePicker } = DatePicker;
  const { item, listIndex }: any = {
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
      wrapperCol={{
        xs: { span: 16 },
        sm: { span: 24 },
      }}
    >
      <RangePicker disabled={item.disabled} format={'YYYY-MM-DD'} />
    </Form.Item>
  )
}
export default Index;