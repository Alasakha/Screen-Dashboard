import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/components/layout/Layout'
import ProdecueLinea from '@/pages/dashboard/1004A/index'
import ProdecueLineb from '@/pages/dashboard/1004B/index'
import ProdecueLinec from '@/pages/dashboard/1004C/index'
import User from '@/pages/User'
import Settings from '@/pages/Settings'
import Home from '@/pages/Home/home'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      {/* 受保护的路由 - 需要登录 */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Home />} /> {/* 默认首页 */}
        <Route path="home" element={<Home />} /> {/* 可选：/home 路由 */}
        
        {/* Dashboard */}
        <Route path="dashboard" element={<ProdecueLinea />} />
        <Route path="dashboard/1004A" element={<ProdecueLinea />} />
        <Route path="dashboard/1004B" element={<ProdecueLineb />} />
        <Route path="dashboard/1004C" element={<ProdecueLinec />} />

        {/* 用户管理 */}
        <Route path="user" element={<User />} />
        <Route path="user/list" element={<User />} />
        <Route path="user/permissions" element={<User />} />
        <Route path="user/groups" element={<User />} />

        {/* 设置 */}
        <Route path="settings" element={<Settings />} />
        <Route path="settings/system" element={<Settings />} />
        <Route path="settings/security" element={<Settings />} />
        <Route path="settings/notifications" element={<Settings />} />
      </Route>

      {/* 登录页 - 不需要保护 */}
      <Route path="/login" element={<Login />} />
      
      {/* 登录重定向示例：访问 /auth 时重定向到 /login */}
      <Route path="/auth" element={<Navigate to="/login" replace />} />

      {/* 404 或其他未匹配页面重定向 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}