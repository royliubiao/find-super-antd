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
  let { Form, Button } = antd
  const { item, listIndex, parentsNames }: any = {
    item: {},
    ...props
  }
  return (
    <Form.Item
      shouldUpdate
    // label={item.label}
    // name={item.name}
    // rules={[{
    //     required: item.required === false ? false : true,
    //     message: item.errMessage ? item.errMessage : `请选择${item.label}！`,
    //     type: item.validateType,
    // }]}
    >
      <div className="df jcsb ais pt20 ">
        <p className='fz18 fc1f fwbd'>{item.label}</p>
        <div className="df jce aic">
          {
            item.buttons && item.buttons.length > 0 && item.buttons.map((btn, btIndex) => (
              <div key={btIndex} className="pl15">
                <Button type={btn.type} onClick={btn.action}>{btn.button}</Button>
              </div>
            ))

          }
        </div>

      </div>

    </Form.Item >
  )
}
export default Index;