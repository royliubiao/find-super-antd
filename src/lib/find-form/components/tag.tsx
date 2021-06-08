import * as React from "react";
import Packages from '../../../utils/index';
import Validate from '../../../utils/validate';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { useEffect, useState } = React

interface formInput {
  item: any,
  listIndex?: number[]
}
const Index: React.FC<formInput> = (props) => {
  let { antd } = Packages.use()
  let { Form, Input, Button, InputNumber } = antd
  const { item, listIndex, parentsNames }: any = {
    item: {},
    ...props
  }
  return (
    <Form.List
      name={listIndex ? [...listIndex, item.name] : item.name}
    >
      {(fields, { add, remove }) => {
        return (
          <div>
            {
              item.label && <p className="label">
                {item.required !== false && <span className='fcred'>* </span>}
                <span className="fwbd">{item.label}</span>
              </p>
            }
            <div className="input__group__outer df jcs aic fw w100">
              {fields && fields.length > 0 && fields.map((field, index) => (
                <div key={index} className={'pr20 w25 psr df jcsb aic'} style={{ width: item.childWidth || '100%' }}>
                  <Form.Item
                    key={field.key}
                    style={{ width: "100%" }}
                  >
                    <div className="df jcsb ais">

                      {
                        item.valueType === 'number' ?
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[{
                              required: item.required === false ? false : true,
                              message: item.errMessage ? item.errMessage : `请添加${item.label}`,
                              validator: async (rule, value) => item.disabled !== true && item.required !== false && Validate['number'](value, item)
                            }]}
                            style={{ width: "100%" }}
                          >
                            <InputNumber
                              style={{ marginRight: 8, width: '100%' }}
                              min={item.min ? item.min : 0}
                              max={item.max}
                              maxLength={item.maxLength || 10000}
                              step={item.step}
                              disabled={item.disabled}
                              placeholder={item.disabled ? '' : item.placeholder ? item.placeholder : `请输入${item.label}`}
                              formatter={value => item.formatter ? `${value}${item.formatter}` : `${value}`}
                            // parser={value => item.formatter ? value.replace(`${item.formatter}`, '') : value}
                            />

                          </Form.Item> :
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[{
                              required: item.required === false ? false : true,
                              message: item.errMessage ? item.errMessage : `请添加${item.label}`,
                              type: item.validateType,
                            }]}
                            style={{ width: "100%" }}
                          >
                            <Input
                              disabled={item.disabled}
                              placeholder={item.placeholder ? item.placeholder : `请添加${item.label}`}
                              style={{ marginRight: 8 }}
                            />

                          </Form.Item>
                      }

                      {fields.length ? (
                        !item.disabled &&
                        <div className="pt10 pl20">
                          <MinusCircleOutlined
                            className="dynamic-delete-button fz18"
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Form.Item>
                </div>
              ))}
            </div>

            {
              ((item.maxFileNum && item.maxFileNum > fields.length) || item.maxFileNum === undefined) ? (
                item.disabled !== true && <Form.Item>
                  <Button
                    type='primary'
                    onClick={() => { add(); }}
                    style={{ paddingLeft: '20px', paddingRight: '20px' }}
                    icon={<PlusOutlined />}
                  >
                    <span>{item.addText || '添加标签'}</span>
                  </Button>
                </Form.Item>) : null
            }
          </div>
        );
      }}
    </Form.List>
  )
}
export default Index;