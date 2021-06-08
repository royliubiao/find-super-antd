import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React


const Index = (props) => {
  let { antd } = Packages.use()
  let { Form, Input } = antd
  const { item }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      label={item.label}
      name={item.name}
      dependencies={[item.dependencies || null]}
      hasFeedback
      rules={[
        {
          required: item.required === false ? false : true,
          message: item.errMessage ? item.errMessage : `请输入${item.label}！`,
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {

            if (item.dependencies) {
              if (!value || getFieldValue(item.dependencies) === value) {
                console.log("确认密码----------1", value, getFieldValue(item.dependencies))
                return Promise.resolve();
              } else {
                console.log("确认密码----------2", value, getFieldValue(item.dependencies))
                return Promise.reject('两次输入的密码不一致！');
              }
            }

          },
        }),
      ]}
    >
      <Input.Password
        allowClear
        disabled={item.disabled}
        maxLength={item.maxLength || 10000}
        placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`} />
    </Form.Item>
  )
}
export default Index;