/*
 * @Author: your name
 * @Date: 2020-05-21 16:51:46
 * @LastEditTime: 2020-11-02 17:35:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /findOnlineOperatingSystem/src/components/online-form copy/scripts/index.ts
 */


/** 能否显示多嵌套层级 */
const canShowLayerItem = (names, relyOn, getValue): boolean => {
    let { name, value, layer, layerName } = relyOn
    let relyNames = [];
    let num = layer //层级
    let isShow = false
    // console.log('能否显示多嵌套层级', names)
    names.map(item => {
        //如果是字符串
        if (num) {
            relyNames.push(item)
        }
        if (typeof item === 'number' && num) {
            num--
        }
    })

    //如果等于要依赖的值
    if (value.includes(getValue([...relyNames, layerName]))) {
        isShow = true
    }


    // console.log('能否显示多嵌套层级', relyNames, num, getValue([...relyNames, layerName]))
    return isShow
}


/** 更新Form表单组件 */
const UpdateFormItem = (item, parentKey, listIndex, fn, itemlistIndex, names) => {
    let show = item.visible === false ? false : true
    let { relyOn, switchVisabled } = item
    let name = [...item.name]
    /** 如果有依赖 */
    if (relyOn) {
        //如果是formList
        // if (relyOn.type === 'formList') {
        //     name = [parentKey, ...listIndex, ...relyOn.name]
        //     let field = fn(name)
        //     // console.log('更新Form表单组件', name, field)
        //     if (relyOn.value.includes(field)) {
        //         show = true
        //     } else {
        //         show = false
        //     }
        // }
        //如果是多嵌套层级
        if (relyOn.layerName) {
            show = canShowLayerItem(names, relyOn, fn)
        }
        else {
            name = relyOn.type === 'formList' ? [parentKey, ...listIndex, ...relyOn.name] : relyOn.name
            let field = fn(name)
            // console.log('更新Form表单组件', name, field)
            if (relyOn.value.includes(field)) {
                show = true
            } else {
                show = false
            }
        }
    }


    /** 如果有switchVisabled */
    if (switchVisabled) {
        let { itemName, parentBortherName, hiddenValue, hiddenByOtherItem } = switchVisabled
        // console.log('更新Form表单组件-------------', item, parentKey, listIndex, fn([itemName, itemlistIndex, parentBortherName]))
        /** 如果有relyOn的情况下 */
        if (hiddenByOtherItem) {
            let relyOnValue = fn(hiddenByOtherItem.name)
            if (relyOnValue === hiddenByOtherItem.value && fn([itemName, itemlistIndex, parentBortherName]) === hiddenValue) {
                show = false
            }
            // console.log('更新Form表单组件-------------', relyOnValue)
        } else { //如果没有relyOn
            if (fn([itemName, itemlistIndex, parentBortherName]) === hiddenValue) {
                show = false
            }
        }


    }

    // console.log('更新Form表单组件-------------', item, parentKey, listIndex, fn(parentKey))
    return show
}


export {
    UpdateFormItem
}