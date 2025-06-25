import React from 'react';
import {
  LayoutDashboard, Users, Settings, Monitor, BarChart3,
  FileText, Shield, Bell, Activity
} from 'lucide-react';

// 定义菜单项的结构
export interface MenuItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  isExternal?: boolean;
}

// 导出菜单数据常量
export const menuItems: MenuItem[] = [
  { title: '主页',
    path: '/home',  
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: '产线看板',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
      { title: '装配A线', path: '/dashboard/1004A', icon: <BarChart3 className="h-4 w-4" /> },
      { title: '装配B线', path: '/dashboard/1004B', icon: <Activity className="h-4 w-4" /> },
      { title: '装配C线', path: '/dashboard/1004C', icon: <FileText className="h-4 w-4" /> }
    ]
  },
  {
    title: '用户管理',
    path: '/user',
    icon: <Users className="h-4 w-4" />,
    children: [
      { title: '用户列表', path: '/user/list', icon: <Users className="h-4 w-4" /> },
      { title: '用户权限', path: '/user/permissions', icon: <Shield className="h-4 w-4" /> },
      { title: '用户组', path: '/user/groups', icon: <Users className="h-4 w-4" /> }
    ]
  },
  {
    title: '设置',
    path: '/settings',
    icon: <Settings className="h-4 w-4" />,
    children: [
      { title: '系统设置', path: '/settings/system', icon: <Settings className="h-4 w-4" /> },
      { title: '安全设置', path: '/settings/security', icon: <Shield className="h-4 w-4" /> },
      { title: '通知设置', path: '/settings/notifications', icon: <Bell className="h-4 w-4" /> }
    ]
  },
  {
    title: '大屏看板',
    path: '/screen',
    icon: <Monitor className="h-4 w-4" />,
    children: [
      { 
        title: '大屏地址', 
        path: 'http://192.168.1.197:10998/home',
        isExternal: true,
        icon: <Activity className="h-4 w-4" />
      },
    ]
  }
  // ... 其他菜单项
];