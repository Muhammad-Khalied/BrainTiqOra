import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import GlobalContentManager from './GlobalContentManager';
import ServicesManager from './ServicesManager';
import PortfolioManager from './PortfolioManager';
import BrandingManager from './BrandingManager';
import HomeManager from './HomeManager';
import AboutManager from './AboutManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'global', label: 'Global Text', path: '/admin' },
    { id: 'branding', label: 'Branding & Nav', path: '/admin/branding' },
    { id: 'home', label: 'Home Page', path: '/admin/home' },
    { id: 'about', label: 'About Page', path: '/admin/about' },
    { id: 'services', label: 'Services', path: '/admin/services' },
    { id: 'portfolio', label: 'Portfolio', path: '/admin/portfolio' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant flex flex-col">
        <div className="p-6 border-b border-outline-variant">
          <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Admin<span className="text-primary">Panel</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 rounded transition-colors font-medium"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-surface">
        <header className="bg-surface-container-low border-b border-outline-variant p-6 flex justify-between items-center">
          <h2 className="text-xl font-headline font-bold text-on-surface capitalize">
            Content Management
          </h2>
          <Link to="/" className="text-sm text-primary hover:underline" target="_blank">
            View Live Site →
          </Link>
        </header>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<GlobalContentManager />} />
            <Route path="/branding" element={<BrandingManager />} />
            <Route path="/home" element={<HomeManager />} />
            <Route path="/about" element={<AboutManager />} />
            <Route path="/services" element={<ServicesManager />} />
            <Route path="/portfolio" element={<PortfolioManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
