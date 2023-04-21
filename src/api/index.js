import service from "@/utils/axios";
//新增wall
export const insertWallApi = data => service.post('/insertwall', data)
