import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const token = localStorage.getItem('token')
  
  // 如果没有 token，重定向到登录页
  if (!token) {
    // 保存当前路径，登录后可以重定向回来
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return <>{children}</>
} 