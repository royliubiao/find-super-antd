import Packages from '../../../utils/index';

/** 重置多选框的值 */
const ResetValue = (name, mess, value, fn?) => {
    let { antd } = Packages.use()
    let { message } = antd
    if (fn) {
        fn({ [name]: value })
    }
    if (mess) {
        message.error({
            top: 200,
            content: mess,
            duration: 3,
        })
    }


}

export {
    ResetValue
}