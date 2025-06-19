export default function Header() {
  return (
    <header className="h-16 bg-white  flex items-center px-6 ">
      <button className="mr-4 p-2 rounded hover:bg-gray-100">
        {/* 菜单图标占位 */}
        <span className="block w-6 h-6 bg-gray-300 rounded" />
      </button>
      <div className="flex-1">顶部内容</div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600">admin</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </header>
  )
} 