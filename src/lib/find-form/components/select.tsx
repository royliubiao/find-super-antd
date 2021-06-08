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
  let { antd, useDebouncedCallback, Api } = Packages.use()
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


  useEffect(() => {
    if (item.search) {
      onSearch()
    }
  }, [])
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
      name={listIndex ? [...listIndex, item.name] : item.name}
      label={item.label}
      shouldUpdate
      rules={[{
        required: item.required === false ? false : true,
        message: item.errMessage ? item.errMessage : `请选择${item.label}！`,
      },
      ({ getFieldValue, setFieldsValue }) => ({

        validator(rule, value) {
          //不能选择联动已有的数据
          if (item.dependencies && getFieldValue(item.dependencies) && getFieldValue(item.dependencies).includes(value)) {
            ResetValue(item.name, item.dependenciesText, null, setFieldsValue)
          }
          return Promise.resolve()
        },
      }),
      ]}
    >
      <Select
        showSearch
        mode={item.mode}
        disabled={item.disabled}
        allowClear
        placeholder={item.disabled ? NoValue : item.placeholder ? item.placeholder : `请选择${item.label}`}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      // filterSort={(optionA, optionB) =>
      //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      // }
      >
        {
          item.options && item.options.length > 0 && item.options.map((sitem, sindex) =>
            <Option key={sindex} value={sitem[item.valueKey]}>{sitem[item.nameKey]}</Option>
          )
        }

      </Select>
    </Form.Item>


  )
}
export default Index;