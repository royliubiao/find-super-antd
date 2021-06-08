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
  let { antd } = Packages.use()
  let { Form, InputNumber } = antd
  const { item, listIndex, parentsNames }: any = {
    item: {},
    ...props
  }
  return (
    <>
      {item.title && <p className="fz18 fc1f fwbd">{item.title}</p>}
      <Form.Item
        // shouldUpdate={item.dependencies ? false : true}
        label={item.label}
        name={listIndex ? [...listIndex, item.name] : item.name}
        dependencies={[item.dependencies || null]}
        rules={[{
          required: item.required === false ? false : true,
          // message: item.errMessage ? item.errMessage : `请正确输入${item.label}！`,
          // type: 'integer',
          // transform: value => Math.floor(value * 100) / 100,
          validator: async (rule, value) => item.disabled !== true && item.required !== false && Validate['number'](value, item)
        },
        ({ getFieldValue, setFieldsValue }) => ({
          validator(_, value) {
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
        <InputNumber
          style={{ width: '100%' }}
          min={item.min ? item.min : 0}
          max={item.max}
          maxLength={item.maxLength || 10000}
          step={item.step}
          disabled={item.disabled}
          placeholder={item.disabled ? '' : item.placeholder ? item.placeholder : `请输入${item.label}`}
          formatter={value => item.formatter ? `${value}${item.formatter}` : `${value}`}
        // parser={value => item.formatter ? value.replace(`${item.formatter}`, '') : value}
        // formatter={value => `${value}${item.formatter}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        // parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
    </>
  )
}
export default Index;