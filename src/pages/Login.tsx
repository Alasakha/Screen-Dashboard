import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import apollobac from '@/assets/background/apollobac.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '@/api/login/login'

export default function Login() {
  const [username, setUsername] = useState('ERP')
  const [password, setPassword] = useState('ERP123')
  const navigate = useNavigate()
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      alert('请输入用户名和密码')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log(`准备使用用户名: ${username} 和密码: ${password} 进行登录...`)
      const response = await login(username, password)

      if (response && response.token) {
        console.log('登录成功，获取到长期 Token:', response.token)
        localStorage.setItem('token', response.token)
        
        // 重定向逻辑：优先重定向到用户原来想访问的页面
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      } else {
        console.error('登录成功，但未在响应中找到 Token:', response)
        alert('登录失败，请稍后再试。')
      }

    } catch (error) {
      console.error('登录处理函数捕获到错误:', error)
      const errorMessage = error?.response?.data?.message || error.message || '用户名或密码错误，或服务器异常。'
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // 最外层：黑色背景+底部图片
    <div
      className="min-h-screen flex items-center justify-center relative bg-neutral-900"
      style={{
        backgroundImage: `url(${apollobac})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'cover',
      }}
    >
      {/* 半透明黑色遮罩，保证内容可读性 */}
      <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      {/* 登录卡片 */}
      <div className="relative z-10 flex w-full max-w-4xl h-[50vh] rounded-3xl overflow-hidden shadow-2xl bg-white">
        {/* 左侧图片+文案 */}
        <div className="relative flex-1 hidden md:flex flex-col justify-end p-10 bg-black">
          <img
            src='https://www.apollino.com/wp-content/uploads/2024/01/CETUS-1.png'
            alt="login-bg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 半透明红色遮罩 */}
          <div className="absolute inset-0 bg-[#d73024]/70" />
          {/* 文案内容 */}
          <div className="relative z-10 text-white mb-8">
            <h2 className="text-2xl font-bold mb-2">Apollo Screen Dashboard</h2>
            <p className="text-base opacity-90">
              阿波罗数字化看板后台系统
            </p>
          </div>
        </div>
        {/* 右侧表单 */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-white">
          <div className="max-w-xs w-full mx-auto">
            <h2 className="text-2xl font-bold mb-2">Login Page 登录</h2>
            <p className="mb-6 text-sm text-gray-500">
              Already have an account? <a href="#" className="text-blue-600 hover:underline">Sign in</a>
            </p>
            <form className="space-y-4" onSubmit={handleLogin}>
              <Input
                type="text"
                placeholder="账号"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="showPwd" className="accent-black" />
                <label htmlFor="showPwd" className="text-sm text-gray-600">Show password</label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '登录中...' : '登录'}
              </Button>
              {error && <p className="text-sm text-destructive text-center mt-2">{error}</p>}
            </form>
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">or Sign up with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex justify-between gap-4">
              <button className="flex-1 py-2 bg-white border rounded-lg shadow-sm flex items-center justify-center">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              </button>
              <button className="flex-1 py-2 bg-white border rounded-lg shadow-sm flex items-center justify-center">
                <img src="https://www.svgrepo.com/show/452210/apple.svg" alt="Apple" className="w-5 h-5" />
              </button>
              <button className="flex-1 py-2 bg-white border rounded-lg shadow-sm flex items-center justify-center">
                <img src="https://www.svgrepo.com/show/475700/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
