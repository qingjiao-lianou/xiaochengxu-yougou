
// 公共url
const baseUrl = "https://api.zbztb.cn/api/public/v1"
var requestTime = 0

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