import * as React from "react";
import Packages from '../../../utils/index';
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: any[]
}
const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use()
  let { Form, Radio } = antd
  const { item, listIndex }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      name={listIndex ? [...listIndex, item.name] : item.name}
      label={item.label}
      rules={[
        {
          required: item.required === false ? false : true,
          message: item.errMessage ? item.errMessage : `请选择${item.label}！`
        },
      ]}
    >
      <Radio.Group
        disabled={item.disabled}
      >
        {
          item.options && item.options.map((ritem, rindex) =>
            <Radio
              key={rindex}
              disabled={ritem.disabled !== true ? false : true}
              value={ritem[item.valueKey]}
            >{ritem[item.nameKey]}</Radio>
          )
        }
      </Radio.Group>
    </Form.Item>
  )
}
export default Index;