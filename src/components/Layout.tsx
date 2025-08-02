
/**
 * 布局组件 - 提供网站的整体布局结构
 */
import React from 'react';
import { Link, useLocation } from 'react-router';
import { BookOpen, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/generator', label: '文本转网站' },
    { path: '/content/money', label: '赚钱篇' },
    { path: '/content/pitfalls', label: '避坑篇' },
    { path: '/content/writing', label: '写作篇' },
    { path: '/content/growth', label: '成长篇' },
    { path: '/about', label: '关于' },
    { path: '/feedback', label: '读者反馈' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <BookOpen className="h-6 w-6" />
            <span>一人企业复利商业化</span>
          </Link>
          
          {/* 桌面导航 */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      location.pathname === item.path ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <nav className="container mx-auto px-4 py-2">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`block py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                        location.pathname === item.path ? 'text-blue-600' : 'text-gray-700'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* 主要内容 */}
      <main className="flex-1">{children}</main>

      {/* 页脚 */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>IDO老徐·一人企业复利商业化</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} IDO老徐 著 | 版权所有
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
