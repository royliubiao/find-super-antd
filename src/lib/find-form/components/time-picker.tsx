import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: any[]
}
const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use()
  let { Form, TimePicker } = antd
  const { RangePicker } = TimePicker;
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
      <RangePicker
        disabled={item.disabled}
        format={'HH:mm:ss'}
        minuteStep={item.minuteStep || 1}
        secondStep={item.secondStep || 1}
      />
    </Form.Item>
  )
}
export default Index;