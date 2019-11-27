import regeneratorRuntime from '../../lib/runtime/runtime';
import { request, login } from '../../request/index.js'

// pages/auth/index.js
Page({

  auth(e) {
    this.getToken(e)

  },

  async getToken(e) {
    // console.log(e.detail);
    const { signature, iv, rawData, encryptedData } = e.detail
    const res1 = await login()
    const { code } = res1
    const tokenPramas = {
      signature, iv, rawData, encryptedData,code
    }
     const res = await request({
       url:"/users/wxlogin",
       method:"post",
       data:tokenPramas
     })
     console.log(res);
     
 
  }

})