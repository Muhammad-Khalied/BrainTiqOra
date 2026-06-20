import { useState, useEffect } from 'react';
import { Menu, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [content, setContent] = useState({
    brandName: 'Brain Tiq Ora',
    navLinks: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About Us' },
      { id: 'services', label: 'Services' },
      { id: 'portfolio', label: 'Portfolio' },
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'branding'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent(prev => ({ 
            ...prev, 
            brandName: data.brandName || prev.brandName,
            navLinks: data.navLinks || prev.navLinks 
          }));
        }
      } catch (error) {
        console.error("Error fetching navbar content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass h-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors font-headline">
            <Menu className="w-6 h-6 text-primary" />
          </button>
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="logo-icon-kinetic group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-on-surface font-headline uppercase">
              {content.brandName}
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {content.navLinks.map((item: any) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`font-headline font-medium text-sm tracking-tight transition-all px-4 py-2 rounded-lg relative ${
                activeTab === item.id 
                  ? 'bg-surface-container-lowest shadow-sm border border-outline-variant text-on-surface' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('about')}
            className="bg-primary text-white border border-outline-variant px-6 py-2.5 rounded-lg font-headline font-semibold text-sm hidden sm:flex items-center gap-2 shadow-geometric hover:bg-primary-dim transition-colors"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </header>
  );
}

