import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CTA from './components/CTA';
import { ThemeProvider } from './components/ThemeProvider';

export default function PublicApp() {
  const [activeTab, setActiveTab] = useState('home');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStartProject={() => setActiveTab('about')} onExploreWork={() => setActiveTab('portfolio')} />;
      case 'about':
        return (
          <>
            <About />
            <CTA onStartProject={() => setActiveTab('about')} onExploreWork={() => setActiveTab('portfolio')} />
          </>
        );
      case 'services':
        return <Services />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return <Home onStartProject={() => setActiveTab('about')} onExploreWork={() => setActiveTab('portfolio')} />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="kinetic-theme">
      <div className="flex flex-col min-h-screen transition-colors duration-300">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
