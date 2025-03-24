
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, LayoutDashboard, Key, FileText, Settings, ChevronLeft, ChevronRight, LogOut, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'API Keys',
      path: '/api',
      icon: Key,
    },
    {
      name: 'Documentation',
      path: '/docs',
      icon: FileText,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-atherbot-blue" />
          <span className="font-bold text-atherbot-dark">Ather Bot</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Sidebar */}
      <aside
        className={cn(
          "h-screen border-r border-gray-200 bg-white flex-shrink-0 fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 md:static",
          collapsed ? "md:w-20" : "md:w-64",
          mobileOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-atherbot-blue" />
            {!collapsed && <span className="font-bold text-atherbot-dark">Ather Bot</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive(item.path)
                  ? "bg-atherbot-blue/10 text-atherbot-blue"
                  : "text-atherbot-gray hover:bg-gray-100 hover:text-atherbot-dark"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t mt-auto">
          <Button variant="ghost" className={cn("w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50", collapsed && "justify-center")}>
            <LogOut className="h-5 w-5 mr-2" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
