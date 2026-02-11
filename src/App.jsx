import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Sales from './pages/Sales';
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import { cn } from './lib/utils';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
          {/* Responsive Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          />

          {/* Main Content Area */}
          <main className={cn(
            "flex-1 flex flex-col transition-all duration-300",
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          )}>
            <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            
            <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
