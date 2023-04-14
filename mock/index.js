//引入
let Mock = require('mockjs')

//留言

export const note =Mock.mock({
    "data|20":[{
        //创建时间
        "moment": new Date(),
        //数据id
        "id|+1":1,
        //用户名Id
        "userId|+1":10,
        //内容
        "message|24-96":"@csentence",
        //所对应的label
        "label|0-5":0,
        //name
        "name":'@cname',
        //爱好
        "like|0-120":0,
        //评论
        "comment|0-110":0,
        //背景色
        "imgurl|0-5":0,
        //是否撤销
        "revoke|0-20":0,
        //是否举报
        "report|0-20":0
    }]
})