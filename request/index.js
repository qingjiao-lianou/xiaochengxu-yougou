
// 公共url
const baseUrl = "https://api.zbztb.cn/api/public/v1"
var requestTime = 0


// pr0mise形式的异步
export const request = function (params) {
    wx.showLoading({
        title: '加载中',
    })
    return new Promise((resolve, reject) => {
        requestTime++
        wx.request({
            ...params,
            url: baseUrl + params.url,

            success: (result) => {
                if (result.data.meta && result.data.meta.status === 200) {
                    resolve(result.data.message)
                } else {
                    reject(result)
                }

            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                // console.log(requestTime)
                requestTime--
                // 当n个请求全部完成后关闭
                if (requestTime === 0) {
                    wx.hideLoading()
                }
                // console.log(requestTime)

            }
        });

    })
}

// promise形式的getSetting
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}
// promise形式的openSetting
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}
// promise形式的chooseAddress
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}
// promise形式的选择弹框
export const showModal = (params) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            ...params,
            success: (result) => {
                resolve(result.confirm)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}
// promise形式的消息提示框
export const showToast = (params) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            ...params,
            icon: 'none',
            mask: true,
            success: (result) => {
                resolve(result)
            },

        });


    })
}
// promise形式的登录状态
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}
