type packages = {
    antd: {},
    BraftEditor: {},
    moment: {},
    Api: {},
    useDebouncedCallback: {},
    UploadUrl?: string,
    GetPrivateToken?: string,
    GetToken?: string,
}

let container = new Map()

//绑定依赖库
const Packages = {
    //绑定
    bind: (key, packages: packages) => {
        container.set(key, packages)
        // console.log('绑定', container.get(key))
    },
    //使用
    use: (key) => {
        let item = container.get(key)
        // console.log('key', key, test)
        if (item === undefined) {
            return null
        } else {
            return item
        }
    }
}


export default Packages