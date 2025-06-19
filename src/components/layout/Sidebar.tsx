import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
<aside className="fixed left-2 top-1 h-[99%] w-56 bg-white rounded-xl shadow-2xl z-50 border border-gray-200 bottom-1">
{/* 顶部 LOGO/团队切换占位 */}
      <div className="h-16 flex items-center justify-center border-b font-bold text-xl tracking-wide select-none">
        LOGO/团队
      </div>
      {/* 菜单分组占位 */}
      <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
        <div className="mb-2 text-xs text-gray-400 font-semibold pl-2">菜单分组</div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `rounded px-4 py-2 font-medium ${
              isActive ? 'bg-[#f5f5f5] text-[#d73024]' : 'hover:bg-gray-100'
            }`
          }
        >
          仪表盘
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive }) =>
            `rounded px-4 py-2 font-medium ${
              isActive ? 'bg-[#f5f5f5] text-[#d73024]' : 'hover:bg-gray-100'
            }`
          }
        >
          用户管理
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `rounded px-4 py-2 font-medium ${
              isActive ? 'bg-[#f5f5f5] text-[#d73024]' : 'hover:bg-gray-100'
            }`
          }
        >
          设置
        </NavLink>
      </nav>
      {/* 底部用户信息占位 */}
      <div className="h-20 flex items-center gap-3 border-t px-4">
        <div className="w-10 h-10 bg-gray-300 rounded-lg" />
        <div className="flex-1">
          <div className="font-semibold text-sm">admin</div>
          <div className="text-xs text-gray-400">admin@email.com</div>
        </div>
      </div>
    </aside>
  )
} 