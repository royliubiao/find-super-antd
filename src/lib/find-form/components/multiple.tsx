import * as React from "react";
import Packages from '../../../utils/index';
import Validate from '../../../utils/validate';
import { NoValue } from '../../../utils/global-variable'
import { ResetValue } from '../scripts'
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: number[],
  parentKey?: any[],
}

const Index: React.FC<formInput> = (props) => {
  let { antd, useDebouncedCallback, Api } = Packages.use('find-super-antd')
  let { Form, Select } = antd
  const { Option } = Select
  const { item, listIndex, parentKey }: any = {
    item: {},
    ...props
  }

  const [state, setState] = useState({
    data: [],
    value: [],
    fetching: false,
  })

  /** 搜索 */
  const [onSearch] = useDebouncedCallback(async (value?) => {
    let { api, searchParam, defaultParams } = item.searchParams
    let params = value ? { ...defaultParams, [searchParam]: value } : defaultParams
    setState({ ...state, data: [], fetching: true })
    const { rows } = await Api[api](params)
    console.log('搜索---------------------', rows);
    setState({ ...state, data: rows, fetching: false })
  }, 1000)


  return (
    <Form.Item
      name={item.name}
      label={item.label}
      // dependencies={[item.dependencies || null]}
      shouldUpdate
      rules={[{
        required: item.required === false ? false : true,
        message: item.errMessage ? item.errMessage : `请选择${item.label}！`
      },
      ({ getFieldValue, setFieldsValue }) => ({

        validator(rule, value) {
          // console.log('1111111111', getFieldValue)
          let mess = ''
          //最多选择数量
          if (item.maxTagCount && value.length > item.maxTagCount) {
            mess = `最多选择${item.maxTagCount}个${item.label}`
            value.splice(value.length - 1, 1)
            ResetValue(item.name, mess, value, setFieldsValue)
          }

          //不能选择联动已有的数据
          if (item.dependencies && getFieldValue(item.dependencies) && value.includes(getFieldValue(item.dependencies))) {
            // console.log('不能选择联动已有的数据', getFieldValue(item.dependencies), value)
            let index = value.findIndex(fitem => fitem === getFieldValue(item.dependencies))
            value.splice(index, 1)
            ResetValue(item.name, item.dependenciesText, value, setFieldsValue)
          }
          return Promise.resolve()
        },
      }),
      ]}

    >
      <Select
        showSearch
        allowClear
        mode={item.type}
        disabled={item.disabled}
        placeholder={item.disabled ? NoValue : item.placeholder ? item.placeholder : `请选择${item.label}`}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {
          item.options && item.options.map((sitem, sindex) =>
            <Option key={sindex} value={sitem[item.valueKey]}>{sitem[item.nameKey]}</Option>
          )
        }

      </Select>
    </Form.Item>


  )
}
export default Index;