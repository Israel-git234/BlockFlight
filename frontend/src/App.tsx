import React, { useState } from 'react';
import { Header } from './components/Header';
import { FeatureSelector } from './components/FeatureSelector';
import { FloatingNav } from './components/FloatingNav';
import { NotificationPanel } from './components/NotificationPanel';
import { BlockFlightGame } from './components/BlockFlightGame';
import { CommunityMarket } from './components/CommunityMarket';
import { motion, AnimatePresence } from 'framer-motion';

type Screen = 'dashboard' | 'blockflight' | 'market' | 'cruise' | 'leaderboard';

function App() {
  const [activeFeature, setActiveFeature] = useState<Screen>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeFeature) {
      case 'blockflight':
        return <BlockFlightGame />;
      case 'market':
        return <CommunityMarket />;
      case 'dashboard':
      default:
        return <FeatureSelector activeFeature={activeFeature} setActiveFeature={setActiveFeature} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1676818038422-1241ccf391bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eSUyMGRhcmt8ZW58MXx8fHwxNzU4OTkxMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      />
      
      {/* Simple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      
      {/* Minimal Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header 
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.05 }}
              transition={{ 
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Navigation */}
        <FloatingNav 
          activeFeature={activeFeature} 
          setActiveFeature={setActiveFeature} 
        />

        {/* Notification Panel */}
        <NotificationPanel 
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>

      {/* Subtle Ambient Glow */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

export default App;