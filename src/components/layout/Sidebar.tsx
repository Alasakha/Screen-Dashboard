import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink,
  LayoutDashboard,
  Users,
  Settings,
  Monitor,
  BarChart3,
  FileText,
  Shield,
  Bell,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/context/SidebarContext'
import { menuItems } from '@/config/menu-data'
import ApolloLogo from '@/assets/APOLLO.png'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export default function Sidebar() {
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { isCollapsed } = useSidebar()

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path)
        : [...prev, path]
    )
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.path)
    const isItemActive = isActive(item.path)

    if (isCollapsed) {
      // 收起状态：只显示图标，支持二级菜单弹出
      if (hasChildren) {
        return (
          <DropdownMenu key={item.path}>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex items-center justify-center p-3 cursor-pointer transition-colors rounded-lg mx-2 mb-1",
                  isItemActive 
                    ? "bg-[#f5f5f5] text-[#d73024]" 
                    : "hover:bg-gray-100"
                )}
              >
                {item.icon && (
                  <span className={cn(
                    "text-gray-500",
                    isItemActive && "text-[#d73024]"
                  )}>
                    {item.icon}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              {item.children!.map(child => (
                <DropdownMenuItem key={child.path} asChild>
                  {child.isExternal ? (
                    <a href={child.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      {child.icon}
                      <span>{child.title}</span>
                    </a>
                  ) : (
                    <NavLink to={child.path} className="flex items-center gap-2">
                      {child.icon}
                      <span>{child.title}</span>
                    </NavLink>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      } else {
        // 无二级菜单，直接跳转
        return (
          <NavLink to={item.path} key={item.path} className={({ isActive }) =>
            cn(
              "flex items-center justify-center p-3 cursor-pointer transition-colors rounded-lg mx-2 mb-1",
              isActive ? "bg-[#f5f5f5] text-[#d73024]" : "hover:bg-gray-100"
            )
          }>
            {item.icon && (
              <span className="text-gray-500">{item.icon}</span>
            )}
          </NavLink>
        )
      }
    }

    return (
      <div key={item.path}>
        <div
          className={cn(
            "flex items-center justify-between px-4 py-2 font-medium cursor-pointer transition-colors",
            level > 0 && "pl-8",
            isItemActive 
              ? "bg-[#f5f5f5] text-[#d73024]" 
              : "hover:bg-gray-100"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.path)
            }
          }}
        >
          {item.isExternal ? (
            <div
              className="flex-1 flex items-center gap-3"
              onClick={(e) => {
                e.stopPropagation()
                handleExternalLink(item.path)
              }}
            >
              {item.icon && (
                <span className={cn(
                  "text-gray-500",
                  isItemActive && "text-[#d73024]"
                )}>
                  {item.icon}
                </span>
              )}
              <span>{item.title}</span>
              <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
            </div>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex-1 flex items-center gap-3",
                  isActive ? "text-[#d73024]" : ""
                )
              }
              onClick={(e) => {
                if (hasChildren) {
                  e.preventDefault()
                }
              }}
            >
              {item.icon && (
                <span className={cn(
                  "text-gray-500",
                  isItemActive && "text-[#d73024]"
                )}>
                  {item.icon}
                </span>
              )}
              <span>{item.title}</span>
            </NavLink>
          )}
          
          {hasChildren && (
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform duration-500 ease-in-out",
                isExpanded && "rotate-180"
              )} 
            />
          )}
        </div>
        
        {hasChildren && (
          <div 
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="ml-4 border-l border-gray-200">
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className={cn(
      "bg-background border-r border-border transition-all duration-300 ease-in-out flex flex-col rounded-lg shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]",
      isCollapsed ? "w-16 " : "w-54",
      "font-sans"
    )}>
      {/* 顶部 LOGO */}
      <div className={cn(
        "h-16 flex items-center justify-center rounded-lg border-b bg-slate-400 border-border font-bold text-xl tracking-wide select-none text-foreground",
        isCollapsed ? "text-sm" : "text-xl"
      )}>
        {isCollapsed ? (
          <img src={ApolloLogo} alt="Apollo" className="h-8 w-8 object-contain" />
        ) : (
          <div className="flex items-center gap-2 ">
            <img src={ApolloLogo} alt="Apollo" className="h-10 w-full object-contain" />
          </div>
        )}
      </div>
      
      {/* 菜单分组 */}
      <nav className="flex-1 flex flex-col gap-2 p-4 ">
        {!isCollapsed && (
          <div className="mb-2 text-xs text-muted-foreground font-semibold pl-2">菜单分组</div>
        )}
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
      
      {/* 底部用户信息 */}
      <div className={cn(
        "h-20 flex items-center gap-3 border-t border-border px-4",
        isCollapsed && "justify-center"
      )}>
        <div className="w-10 h-10 bg-muted rounded-lg" />
        {!isCollapsed && (
          <div className="flex-1">
            <div className="font-semibold text-sm text-foreground">admin</div>
            <div className="text-xs text-muted-foreground">admin@email.com</div>
          </div>
        )}
      </div>
    </aside>
  )
} 