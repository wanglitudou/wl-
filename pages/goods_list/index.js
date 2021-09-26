import { request }  from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
			tabs: [
					{
					id: '0',
					value: '综合',
					isActive: true,
					},
					{
						id: '1',
						value: '销量',
						isActive: false,
					},
					{
						id: '2',
						value: '价格',
						isActive: false
					}
		],
			goodsList: []
    },
		QueryParams: {
			query: "",
			cid: "",
			pagenum: "",
			pagesize: ""
	},
		//总页数
		totalPages:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			this.QueryParams.cid = options.cid;
			this.getGoodsList()
	},
		//获取商品列表数据
	async getGoodsList () {
		const res = await request({
			url: '/goods/search',
			data:this.QueryParams
		})
		const total = res.total;
		//计算总页数
		this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
		this.setData({
		// 拼接了数组
			 goodsList:[...this.data.goodsList,...res.goods]
		})
		//关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会再造成影响应
  	wx.stopPullDownRefresh()
	},
		//标题点击事件 从子组件传递过来
	handleTabsItemChange (e) {
		//1 获取被点击标题的索引
		const { index } = e.detail;
		//2 修改源数组
		let { tabs } = this.data;
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中	
		this.setData({
			tabs
		})
	},
	//页面上滑 滚动条触底事件
	onReachBottom () {
		//判断还有没有下一页数据
		if (this.QueryParams.pagesize >= this.totalPages) {
			//没有下一页数据
			console.log("没有下一个数据");
			wx.showToast({ title: '没有下一页数据' });
		} else {
			//还有下一页数据
			this.QueryParams.pagesize++;
			this.getGoodsList()
		}
	},
	//页面上拉刷新
	onPullDownRefresh () {
		this.setData({
			// 1 重置数组
			goodsList:[]
		})
			//2 重置页码
		this.QueryParams.pagenum = 1;
		//3 发送 请求
		this.getGoodsList()
		
	}
})