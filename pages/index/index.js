import { request }  from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
	data: {
		//轮播数组
    swiperList:[],
    //导航数组
		catesList: [],
		//楼层数据
		floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		  // 1 发送异步请求获取轮播图数据  优化的手段可以通过es6的 promise来解决这个问题 
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getSwiperList()
		this.getcatesList()
		this.getfloorList()
		//优化之后
	
  },
  //获取轮播图 
  getSwiperList(){
    request({
			url: "/home/swiperdata",
		    }).then(result => {
          this.setData({
          swiperList: result
        })
		})
  },
  //获取分类
  getcatesList(){
    request({
			url: "/home/catitems",
		    }).then(result => {
          this.setData({
            catesList: result
        })
		})
	},
	//获取楼层数据
	getfloorList(){
    request({
			url: "/home/floordata",
		    }).then(result => {
          this.setData({
            floorList: result
        })
		})
  }

  
})