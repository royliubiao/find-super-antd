import * as React from "react";
import Packages from '../../../utils/index';
import Validate from '../../../utils/validate';
import { NoValue } from '../../../utils/global-variable'
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: number[],
  parentsNames?: any[]
}

const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use('find-super-antd')
  let { Form, Input } = antd
  const { item, listIndex, parentsNames }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      // shouldUpdate
      label={item.label}
      dependencies={[item.dependencies ? (parentsNames ? [...parentsNames, item.dependencies] : item.dependencies) : null]}
      name={listIndex ? [...listIndex, item.name] : item.name}
      rules={[
        {
          required: item.required === false ? false : true,
          message: item.errMessage ? item.errMessage : `请输入${item.label}！`,
          type: item.validateType,
          validator: item.validator && typeof item.validator === 'string' ? async (rule, value) => Validate[item.validator](value, item) : null
        },
        ({ getFieldValue, setFieldsValue }) => ({
          validator(_, value) {


            // /** 如果有validatorTyep */
            // if (item.validatorTyep) {
            //   return Validate[item.validatorTyep](value, item)
            // }

            /** 如果有item.dependencies */
            if (item.dependencies) {
              let dependenciesName = parentsNames ? [...parentsNames, item.dependencies] : item.dependencies
              console.log('input', dependenciesName)
              return item.validator(getFieldValue(dependenciesName), value, getFieldValue, dependenciesName, setFieldsValue)
            } else {
              return Promise.resolve()
            }
          },
        }),
      ]}
    >
      <Input
        onPaste={(e) => { item.disablePaste && e.preventDefault() }}
        allowClear
        disabled={item.disabled}
        placeholder={item.disabled ? NoValue : item.placeholder ? item.placeholder : `请输入${item.label}`}
      />
    </Form.Item >
  )
}
export default Index;