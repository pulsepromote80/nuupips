"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  RiDashboardLine, 
  RiUser3Line,  
  RiSettings4Line, 
  RiLogoutCircleLine,
  RiMenu3Line,
  RiCloseLine,
  RiNotification3Line,
  RiMoonLine,
  RiSunLine,
  RiArrowDownSLine,
  RiContactsBookLine,
  RiArticleLine,
  RiChat1Line ,
  RiCommentLine
} from 'react-icons/ri';
import { 
  RiFolderLine, 
} from "react-icons/ri";

import ReduxProvider from '../components/ReduxProvider';
import { Toaster } from 'react-hot-toast';
import './admin.css';

const menuItems = [
  { icon: RiDashboardLine, label: 'Dashboard', href: '/admin', badge: null },
  { icon: RiContactsBookLine, label: 'Contact Us', href: '/admin/contact', badge: '3' },
  { icon: RiFolderLine, label: 'Category', href: '/admin/category', badge: null },
  { icon: RiArticleLine, label: 'Blog', href: '/admin/blog', badge: null },
    { icon: RiChat1Line , label: 'Comment', href: '/admin/comment', badge: null },

];

// Helper function to get token from storage
const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

// Helper function to get user data from storage
const getUserData = () => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  return null;
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Mobile: sidebar hidden by default, Desktop: sidebar visible by default
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop collapsed state
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false); // Close sidebar on mobile by default
      } else {
        setSidebarOpen(true); // Open sidebar on desktop by default
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when navigating to a new page (mobile only)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Mock user data
  const [user, setUser] = useState({
    name: 'Admin User',
    email: 'admin@nupis.com',
    role: 'Super Admin',
    avatar: null
  });

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = getToken();
      const userData = getUserData();
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes from login/logout
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Redirect to login if not authenticated (but allow login page to render)
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  // Don't render layout on login page - just render children
  const isLoginPage = pathname === '/admin/login';

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    // Clear auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentUser');
    }
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  // Toggle sidebar - different behavior for mobile vs desktop
  const toggleSidebar = () => {
    if (isMobile) {
      // Mobile: slide-in/out
      setSidebarOpen(!sidebarOpen);
    } else {
      // Desktop: collapse/expand
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Determine sidebar width based on state
  const getSidebarWidth = () => {
    if (isMobile) {
      return 'w-72'; // Fixed width on mobile
    }
    return sidebarCollapsed ? 'w-20' : 'w-64'; // Collapsed or expanded on desktop
  };
  
  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

// If not authenticated and on login page, render just the children without layout
  if (!isAuthenticated && isLoginPage) {
    return (
      <ReduxProvider>
        <Toaster position="top-right" />
        <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </div>
        </div>
      </ReduxProvider>
    );
  }

  // If not authenticated and not on login page, don't render content
  if (!isAuthenticated) {
    return null;
  }

return (
    <ReduxProvider>
      <Toaster position="top-right" />
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
          {/* Mobile Overlay */}
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside 
            className={`fixed top-0 left-0 z-50 h-screen flex flex-col bg-[#29d2cc] dark:bg-[#2E4A5B] border-r border-[#e6edfd] dark:border-gray-700 transition-all duration-300 ${
              getSidebarWidth()
            } ${
              // Mobile: slide in from left, Desktop: always visible
              isMobile 
                ? `${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
                : ''
            }`}
            style={{ marginTop: 0 }}
          >
            {/* Logo */}
            <div className="h-16 lg:h-20 flex items-center justify-between px-2 lg:px-4 border-b border-white/20 dark:border-gray-700 bg-transparent dark:bg-transparent">
              {/* Logo - Always show on mobile when sidebar is open, on desktop based on collapsed state */}
              {(!isMobile || sidebarOpen) && (
                !isMobile && sidebarCollapsed ? (
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg mx-auto">
                    <span className="text-[#D16655] font-bold text-lg">N</span>
                  </div>
                ) : (
                  <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                      <span className="text-[#D16655] font-bold text-sm lg:text-lg">N</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm lg:text-lg text-white dark:text-white tracking-tight">NUPIPS</span>
                      <span className="text-[8px] lg:text-[10px] text-white/80 -mt-1 hidden lg:block">Admin Panel</span>
                    </div>
                  </Link>
                )
              )}
              {/* Close button - show on mobile, show on desktop when expanded */}
              {isMobile ? (
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 lg:p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-700 text-white dark:text-gray-300 transition-colors"
                >
                  <RiCloseLine className="text-lg lg:text-xl" />
                </button>
              ) : (
                sidebarOpen && (
                  ""
                )
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                          isActive 
                            ? 'bg-white text-[#D16655] shadow-lg' 
                            : 'text-white/90 hover:bg-white/20 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`text-xl flex-shrink-0 ${isActive ? 'text-[#D16655]' : 'text-white group-hover:text-white'}`} />
                          {sidebarOpen && (
                            <span className="font-medium text-black">{item.label}</span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-white/20 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/90 hover:bg-white/20 transition-colors"
              >
                <RiLogoutCircleLine className="text-xl flex-shrink-0" />
                {sidebarOpen && <span className="font-medium text-white">Logout</span>}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
            sidebarOpen ? 'ml-[18%]' : 'ml-32'
          }`}>
            {/* Header */}
            <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-[#e6edfd] dark:border-gray-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 w-full">
              {/* Left side */}
              <div className="flex items-center gap-4">
                {/* Hamburger button - always visible */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2.5 rounded-xl hover:bg-[#F8EBE5] dark:hover:bg-gray-700 text-[#505050] dark:text-gray-300 transition-colors"
                >
                  {sidebarOpen ? (
                    ""
                  ) : (
                    <RiMenu3Line className="text-xl" />
                  )}
                </button>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Theme Toggle */}
                {/* <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl hover:bg-[#F8EBE5] dark:hover:bg-gray-700 text-[#505050] dark:text-gray-300 transition-colors"
                  title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDark ? <RiSunLine className="text-xl" /> : <RiMoonLine className="text-xl" />}
                </button> */}

                {/* Notifications */}
                <button className="relative p-2.5 rounded-xl hover:bg-[#F8EBE5] dark:hover:bg-gray-700 text-[#505050] dark:text-gray-300 transition-colors">
                  <RiNotification3Line className="text-xl" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#D16655] rounded-full border-2 border-white dark:border-gray-800"></span>
                </button>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-3 lg:p-3 w-full">
              {children}
            </main>
          </div>

        </div>
      </div>
    </ReduxProvider>
  );
}
