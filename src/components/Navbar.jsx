import { Search, Bell, User, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLocation } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/users': return 'User Management';
      case '/sales': return 'Sales Analytics';
      case '/settings': return 'Account Settings';
      default: return 'Admin Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search size={18} className="text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
          </button>

          <div className="h-8 w-[1px] bg-border mx-1"></div>

          <div className="flex items-center gap-3 pl-1">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-primary">naveen</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 cursor-pointer hover:bg-primary/20 transition-all">
              <User size={20} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
