import service from "@/utils/axios";

//注册用户
export const insertUser = (data) => service.post("/insertuser", data);
//发送验证码
export const sendCode = (data) => service.post("/code", data);
//登录用户
export const loginUser = (data) => service.post("/loginUser", data);
//找回密码 (重新设置密码)//更新部分内容
export const searchUser = (data) => service.patch("/searchUser", data);

//显示卡片数据
export const showCard = (data) => service.get("/showCard", data);

//获取评论数据

export const showComment = (data) => service.get("/showComment", data);

//用户添加发布卡片
export const addCard = (data) => service.post("/addCard", data);

//用户喜爱反馈

export const changefeedbacks = (data) => service.post("/changefeedbacks", data);

//用户是否喜爱
export const userlike = (data) => service.get("/userLike", data);

//用户举报反馈
export const changefeedbacksreport = (data) => service.post("/changefeedbacksreport", data)



//用户是否举报

export const userreport = (data) => service.get("/userReport", data)


//发布新评论

export const addCommit = (data) => service.post("/addCommit", data)

//删除卡片 
export const deleteCard= (data) => service.post("/deleteCard", data)

//搜索卡片

export const selectCard=(data)=>service.get("/inputSelectCard", data)

//获取粉丝和关注

export const selectFollow =(data)=>service.get("/selectFollow",data)

//关注用户

export const guanzhuT =(data)=>service.post("/guanzhuT",data)

//取消关注用户

export const guanzhuF =(data)=>service.post("/guanzhuF",data)