import React, { useEffect } from 'react'
import { Menu, Search } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext' // 确保使用正确的路径
import { useSearch } from '@/context/SearchContext'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { toggleSidebar } = useSidebar()
  const { setIsOpen } = useSearch()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setIsOpen])

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4 p-2 rounded hover:bg-accent transition-colors"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Apollo Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            onClick={() => setIsOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
            <span className="hidden lg:inline-flex">搜索...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>
            </kbd>
          </Button>
          <ThemeToggle />
          {/* 用户信息或其他头部内容 */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-full" />
            <span className="text-sm font-medium text-foreground">Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}