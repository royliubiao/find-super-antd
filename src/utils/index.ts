type packages = {
    antd: {},
    BraftEditor: {},
    moment: {},
    Api: {},
    useDebouncedCallback: {},
    UploadUrl?: string,
}

let container = new Map()

//绑定依赖库
const Packages = {
    //绑定
    bind: (packages: packages) => {
        container.set('find-antd', packages)
        // console.log('绑定', container.get(key))
    },
    //使用
    use: () => {
        let item = container.get('find-antd')
        // console.log('key', key, test)
        if (item === undefined) {
            return null
        } else {
            return item
        }
    }
}


export default Packages