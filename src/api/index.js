import service from "@/utils/axios";

//新增wall
// export const insertWallApi = data => service.post('/insertwall', data)
//注册用户
 export const insertUser = data => service.post('/insertuser', data)
 //发送验证码
 export const sendCode = data => service.post('/code',data)