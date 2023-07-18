import CryptoJS from 'crypto-js';

// 定义加密和解密的密钥
const encryptionKey = 'user-permissions-key';

// 加密字段
export const encryptField = function (field) {
  const encryptedField = CryptoJS.AES.encrypt(field, encryptionKey).toString();
  return encryptedField;
}

// 解密字段
export const decryptField = function (encryptedField) {
  var bytes  = CryptoJS.AES.decrypt(encryptedField, encryptionKey);
var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}