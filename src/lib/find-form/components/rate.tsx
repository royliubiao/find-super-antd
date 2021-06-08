import * as React from "react";
import Packages from '../../../utils/index';
import Validate from '../../../utils/validate';
import { NoValue } from '../../../utils/global-variable'
import { ResetValue } from '../scripts'
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: number[],
}

const Index: React.FC<formInput> = (props) => {
  let { antd, useDebouncedCallback, Api } = Packages.use()
  let { Form, Rate } = antd
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
          message: item.errMessage ? item.errMessage : `请选择${item.label}！`,
          // type: item.validateType,
          // validator: item.validator ? async (rule, value) => Validate[item.validator](value, item) : null
        }
      ]}
    >
      <Rate
        count={item.count || 5}
        disabled={item.disabled}
      />
    </Form.Item >


  )
}
export default Index;