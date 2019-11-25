
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