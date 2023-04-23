let baseUrl = '';
let routerMode ='hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
 
    baseUrl='http://localhost:3000';
    baseImgPath = 'https://localhost:3000';

}else{
    
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}