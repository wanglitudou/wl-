/* promise 形式 getSetting*/
export const getSetting = () => {
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success: (result) => {
				resolve(result);
			},
      fail: (err) => {
        reject(err);
      }
		})
	})
}
/* promise 形式 chooseAddress*/
export const chooseAddress = () => {
	return new Promise((resolve, reject) => {
		wx.chooseAddress({
			success: (result) => {
				resolve(result);
			},
      fail: (err) => {
        reject(err);
      }
		})
	})
}
/* promise 形式 openSetting*/
export const openSetting = () => {
	return new Promise((resolve, reject) => {
		wx.openSetting({
			success: (result) => {
				resolve(result);
			},
      fail: (err) => {
        reject(err);
      }
		})
	})
}
/* promise 形式 showModal*/
export const showModal = ({ content }) => {
	return new Promise((resolve, reject) => {
		 wx.showModal({
				title: '提示',
				content: content,
				success :(res)=> {
					resolve(res);
				},
				fail: (err) => {
								reject(err);
					}
				})
	})
}

// wx.showToast({
//   title: '成功',
//   icon: 'success',
//   duration: 2000
// })
/* promise 形式 showToast*/
export const showToast = ({ title }) => {
	return new Promise((resolve, reject) => {
		 wx.showToast({
		  	title: title,
				icon: "none",
				success :(res)=> {
					resolve(res);
				},
				fail: (err) => {
								reject(err);
					}
				})
	})
}

/* promise 形式 login*/
export const login = () => {
	return new Promise((resolve, reject) => {
		 wx.login({
			 timeout:10000,
			 success: (result) => {
				resolve(result);
			 },
			 fail: (err) => {
				reject(err);
			 }
		 });
			 
	})
}

/* promise 形式 小程序的微信支付*/
export const requestPayment = () => {
	return new Promise((resolve, reject) => {
		wx.wx.requestPayment({
			timeStamp: '',
			nonceStr: '',
			package: '',
			signType: '',
			paySign: '',
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		});
			
			 
	})
}