import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/pages/dashboard/index'
import User from '@/pages/User'
import Settings from '@/pages/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      {/* 其他页面 */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}