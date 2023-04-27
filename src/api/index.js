import service from "@/utils/axios";

//新增wall
// export const insertWallApi = data => service.post('/insertwall', data)
//注册用户
 export const insertUser = data => service.post('/insertuser', data)
 //发送验证码
 export const sendCode = data => service.post('/code',data);
 //登录用户
 export const loginUser = data => service.post('/loginUser',data)
 //找回密码 (重新设置密码)//更新部分内容
 export const searchUser = data => service.patch('/searchUser',data)