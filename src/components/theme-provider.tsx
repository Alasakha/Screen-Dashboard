import { createContext, useContext, useEffect, useState } from 'react'

// 更新类型定义，包含所有自定义主题
type Theme = 'dark' | 'light' | 'system' | 'dark-red' | 'dark-purple' | 'dark-green'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'apollo-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = document.documentElement

    // 1. 先清除所有旧状态
    root.classList.remove('dark')
    root.removeAttribute('data-theme')

    // 2. 解析当前主题
    let effectiveTheme = theme
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    
    // 3. 应用新状态
    if (effectiveTheme.startsWith('dark')) {
      root.classList.add('dark')
    }

    if (effectiveTheme.includes('-')) {
      const color = effectiveTheme.split('-')[1] // "red", "purple", "green"
      root.setAttribute('data-theme', color)
    }

  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}