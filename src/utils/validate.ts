const Validate = {
    /** 校验电话号码 */
    phone: async (value, item?) => {
        if (item && item.required === false) {
            return Promise.resolve();
        }

        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (value && !myreg.test(value)) {
            throw new Error('Something wrong!');
        } else {
            //如果有callback
            if (item && item.action) {
                item.action(value)
            }
            // //如果有getUserInfo
            // if (item.getUserInfo) {
            //     GetInfoByPhone(value, item)
            // }
            return Promise.resolve();
        }
    },

    /** 没有中文 */
    noChinese: async (value, item?) => {
        if (item && item.required === false) {
            return Promise.resolve();
        }

        let myreg = /[\u4E00-\u9FA5]/g;
        if (value && !myreg.test(value)) {
            return Promise.resolve();
        } else {
            throw new Error('Something wrong!');
        }
    },
    /** 密码验证 */
    password: async (value, item?) => {
        if (item && item.required === false) {
            return Promise.resolve();
        }
        let myreg = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}');
        if (value && !myreg.test(value)) {
            return Promise.resolve();
        } else {
            throw new Error('Something wrong!');
        }
    },

    /** 验证编辑器 */
    edit: (value, required) => {
        if (required === false) {
            return Promise.resolve();
        }
        if (value.isEmpty()) {
            throw new Error('请输入正文内容');
        } else {
            return Promise.resolve();
        }
    },
    /** 验证是否是数字 */
    number: (value, item?) => {
        let regPos = /^[0-9]*[1-9][0-9]*$/;; //正整数
        let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        console.log('验证是否是数字', value)
        if (item.min === 0 && value === 0) {
            return Promise.resolve()
        }
        //浮点小数
        if (item.formatter === '元' || item.formatter === '折' || item.formatter === '%') {

            if (!reg.test(value)) {
                return Promise.reject(new Error('请输入正数且最多2位小数'))
            }


        }
        //正整数
        if (item.formatter === '分钟' || item.formatter === '台') {
            if (!regPos.test(value)) {
                return Promise.reject(new Error('请输入正整数'))
            }

        }



        //如果有最大值
        if (value && item.max && value > item.max) {
            console.log('如果有最大值', value)
            return Promise.reject(new Error(item.errMessage || `${item.label}最大不能超过${item.max}`))
        }

        //如果是空值
        if (!value && value !== 0) {
            return Promise.reject(new Error(`${item.errMessage || '请输入' + item.label}`))
        }



        return Promise.resolve()
    },


    /**校验价格  */
    price: (value, item) => {
        //符号
        let flag = new RegExp("[`~!@#$^&*()=|{};,\\[\\].<>《》/?~！@#￥……&*（）——|{}【】；”“。，、？ ]")

        if (flag.test(value)) {
            return Promise.reject(new Error('禁止输入符号'))
        }

        return Promise.resolve()
    }
}

export default Validate