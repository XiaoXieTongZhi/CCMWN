let baseUrl = '';
let routerMode ='hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
 
    baseUrl='http://localhost:3000';
    baseImgPath = 'http://localhost:3000';

}else{
    baseUrl='https://www.ccmwn.cn';
    baseImgPath = 'https://www.ccmwn.cn';
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}