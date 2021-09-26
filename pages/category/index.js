// pages/category/index.js
import { request }  from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    /**
     * 页面的初始数据
     */
	data: {
		//左侧菜单数据
		leftMenuList: [],
		//右侧商品数据
		rightContent: [],
		//被点击的菜单
		currentIndex: 0,
		//菜单到顶部的距离
		scrollTop:0
	},
	//接口返回的数据
	Cates:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			// this.getCates();
			/*
			0 web中的本地存储 和小程序中的本地存储的区别
				 1 写代码的方式不一样了
					web： localStorage.setItem('key',value) localStorage.gettItem('key')
				小程序：wx.setStorageSync("key",value) wx.getStorageSync("key")
				 2 存的时候没有做类型转换
					web ： 不管存入的海思什么类型的数据 最终都会先调用以下 toString(),把数据变成了字符串，再存入进去
				小程序 ：不存在 类型转换这个操作 存什么类型的数据进去，获取的时候就是什么类型的数据

			 1 先判断一下本地存储中有没有旧的数据
				{time.date.now(),data:[...]}
			 2 没有旧数据 直接发送新请求
			 3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可

			*/
			// 1 获取本地存储中的数据 (小程序中也是存在本地存储 技术)
			const Cates = wx.getStorageSync('cates')
			// 2 判断
			if (!Cates) {
				//不存在 发送请求获取数据
				this.getCates()
			} else {
				//有旧的数据 定义过期时间 10s 改成5分钟
				if (Date.now() - Cates.time > 1000 * 10) {
					//重新发送请求
					this.getCates()
				} else {
					//可以使用旧数据
			 	   this.Cates = Cates.data;
					 //构造左侧的菜单数据
					 let leftMenuList = this.Cates.map(v => v.cat_name);
					 // 构造右侧的商品数据
					 let rightContent = this.Cates[0].children;
						this.setData({
							 leftMenuList,
							 rightContent
							 })
					
				}
			}
    },
  async getCates(){
      // request({
      //      url: "/categories",
      //        }).then(res => {
      //           console.log(res);
			// 				 this.Cates = res.data.message;
			// 				 //把接口的数据存入到本地存储中
			// 				 wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
			// 				 //构造左侧的菜单数据
			// 				 let leftMenuList = this.Cates.map(v => v.cat_name);
      //       // 构造右侧的商品数据
      //       let rightContent = this.Cates[0].children;
      //        this.setData({
      //           leftMenuList,
      //           rightContent
      //           })
			//        })
		const res = await request({ url: "/categories" })
					this.Cates = res;
						//把接口的数据存入到本地存储中
						wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
						//构造左侧的菜单数据
						let leftMenuList = this.Cates.map(v => v.cat_name);
				// 构造右侧的商品数据
		    		let rightContent = this.Cates[0].children;
							this.setData({
								leftMenuList,
								rightContent
								})
	 },
	handleItemTap (e) {
			/*
			 1 获取被点击的标题身上的索引
			 2 给data中的currentIndex赋值就即可
			 3 根据不同的索引 来渲染右侧的商品内容
			*/
		const { index } = e.currentTarget.dataset;
		let rightContent = this.Cates[index].children;
		this.setData({
			currentIndex: index,
			rightContent,
			//重新设置 右侧内容的scroll-view标签距离顶部的距离
			scrollTop:0
		})
	}

})