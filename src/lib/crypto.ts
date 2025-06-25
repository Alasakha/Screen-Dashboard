/**
 * 将 ArrayBuffer 转换为 Base64 字符串的辅助函数
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

/**
 * 严格按照后端同事代码实现的加密函数。
 * 将 IV 和加密数据转换为十六进制 (Hex) 字符串。
 */
export async function encryptData(data: string, token: string): Promise<{ iv: string; encryptedData: string }> {
  // 1. 从原始 token 中截取前 32 个字符作为密钥源
  const keySource = token.substring(0, 32);
  const key = new TextEncoder().encode(keySource);

  // 2. 将密钥源导入 Web Crypto API
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  // 3. 生成一个 12 字节的随机初始化向量 (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 4. 加密数据
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
      tagLength: 128,
    },
    keyMaterial,
    new TextEncoder().encode(data)
  );

  // 5. 将 IV 和加密后的数据转换为十六进制字符串
  const ivBase64 = arrayBufferToBase64(iv);
  const encryptedDataBase64 = arrayBufferToBase64(encrypted);

  return {
    iv: ivBase64,
    encryptedData: encryptedDataBase64,
  };
}
