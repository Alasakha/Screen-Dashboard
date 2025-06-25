import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/routes/index' // 你之前写的那个 routes 配置文件

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App