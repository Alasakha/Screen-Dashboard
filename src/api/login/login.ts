import request from '@/utils/request';
import { encryptData } from '@/lib/crypto';

// 在真实路径前加上 /api 来触发 Vite 代理
const TOKEN_URL = '/api/apollo/dataAcquisition/token';
const LOGIN_URL = '/api/apollo/dataAcquisition/login';

/**
 * 第一步：获取用于加密的临时 Token
 */
export function getToken() {
  console.log(`准备向 ${TOKEN_URL} 发送请求...`);
  // axios 会自动拼接为: /apollo/dataAcquisition/token
  return request.post(TOKEN_URL);
}

/**
 * 最终的、利用了 Vite 代理的登录函数
 */
export async function login(username, password) {
  try {
    const tokenResponse = await request.post(TOKEN_URL);
    const tempToken = tokenResponse.token;

    if (!tempToken) {
      throw new Error('未能从后端响应中获取到临时登录令牌');
    }

    // --- 诊断日志开始 ---
    console.group("🕵️‍♂️  前端加密过程诊断");
    console.log("1. 获取到的临时 Token:", tempToken);

    const keySource = tempToken.substring(0, 32);
    console.log("2. 用于生成密钥的源字符串 (Token前32位):", keySource);

    const timestamp = Date.now();
    const dataToEncrypt = { username, password, timestamp, token: tempToken };
    const plainText = JSON.stringify(dataToEncrypt);
    console.log("3. 加密前的明文 JSON 字符串:", plainText);

    const { iv, encryptedData } = await encryptData(plainText, tempToken);
    console.log("4. 加密后的 IV (Hex):", iv);
    console.log("5. 加密后的数据 (Hex):", encryptedData);

    const payload = {
      encryptedData: encryptedData,
      iv: iv,
      token: tempToken
    };
    console.log("6. 发送给后端的最终 Payload:", payload);
    console.groupEnd();
    // --- 诊断日志结束 ---
    
    const loginResponse = await request.post(LOGIN_URL, payload);
    return loginResponse;

  } catch (error) {
    console.error('登录流程失败:', error);
    if (error.response) {
      console.error('后端返回的错误详情:', error.response.data);
    }
    throw error;
  }
}

