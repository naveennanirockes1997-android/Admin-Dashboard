import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: ShoppingCart, label: 'Sales', path: '/sales' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />
      
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-50",
          isOpen ? "w-64" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
        )}
      >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6">
          <div className={cn("flex items-center gap-3 overflow-hidden transition-all", !isOpen && "w-0 opacity-0")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl whitespace-nowrap">AdminDash</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <item.icon size={22} className="min-w-[22px]" />
              <span
                className={cn(
                  "font-medium transition-all duration-300 whitespace-nowrap",
                  !isOpen && "opacity-0 translate-x-10 pointer-events-none"
                )}
              >
                {item.label}
              </span>
              
              {!isOpen && (
                <div className="absolute left-full ml-6 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60]">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer info or Profile placeholder */}
        <div className="p-4 border-t border-border">
          <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=naveen" alt="avatar" />
            </div>
            {isOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate text-primary uppercase tracking-tight">naveen</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
