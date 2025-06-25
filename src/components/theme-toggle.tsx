import { Moon, Sun, Flame, Palette, Leaf } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // 根据当前主题显示对应图标
  const getCurrentIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case 'dark-red':
        return <Flame className="h-[1.2rem] w-[1.2rem]" />
      case 'dark-purple':
        return <Palette className="h-[1.2rem] w-[1.2rem]" />
      case 'dark-green':
        return <Leaf className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {getCurrentIcon()}
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          浅色主题
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          深色主题
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme('dark-red')}>
          <Flame className="mr-2 h-4 w-4" />
          黑红主题
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark-purple')}>
          <Palette className="mr-2 h-4 w-4" />
          紫黑主题
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark-green')}>
          <Leaf className="mr-2 h-4 w-4" />
          绿黑主题
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <span className="mr-2 h-4 w-4">💻</span>
          跟随系统
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 