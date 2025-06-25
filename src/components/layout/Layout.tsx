import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/components/theme-provider'
import { SearchProvider } from '@/context/SearchContext'
import { CommandMenu } from '@/components/command-menu'

function LayoutContent() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="apollo-theme">
      <SidebarProvider>
        <SearchProvider>
          <LayoutContent />
          <CommandMenu />
        </SearchProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
} 