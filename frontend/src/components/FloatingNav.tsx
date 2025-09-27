import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane, Users, Ship, Trophy, Home } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingNavProps {
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', color: 'blue' },
  { id: 'blockflight', icon: Plane, label: 'BlockFlight', color: 'cyan' },
  { id: 'market', icon: Users, label: 'Market', color: 'purple' },
  { id: 'cruise', icon: Ship, label: 'Cruise Mode', color: 'green' },
  { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', color: 'yellow' }
];

// Helper functions for safe Tailwind classes
const getButtonClass = (color: string, isActive: boolean) => {
  if (!isActive) return 'bg-gray-800/80 hover:bg-gray-700/80 border-gray-600/50 hover:border-gray-500'

  switch (color) {
    case 'blue': return 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 shadow-blue-500/25'
    case 'cyan': return 'bg-gradient-to-br from-cyan-500 to-cyan-600 border-cyan-400 shadow-cyan-500/25'
    case 'purple': return 'bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400 shadow-purple-500/25'
    case 'green': return 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 shadow-green-500/25'
    case 'yellow': return 'bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-400 shadow-yellow-500/25'
    default: return 'bg-gradient-to-br from-gray-500 to-gray-600 border-gray-400 shadow-gray-500/25'
  }
}

const getGlowClass = (color: string) => {
  switch (color) {
    case 'blue': return 'from-blue-400 to-blue-600'
    case 'cyan': return 'from-cyan-400 to-cyan-600'
    case 'purple': return 'from-purple-400 to-purple-600'
    case 'green': return 'from-green-400 to-green-600'
    case 'yellow': return 'from-yellow-400 to-yellow-600'
    default: return 'from-gray-400 to-gray-600'
  }
}

const getActiveGlowClass = (color: string) => {
  switch (color) {
    case 'blue': return 'bg-blue-500/30'
    case 'cyan': return 'bg-cyan-500/30'
    case 'purple': return 'bg-purple-500/30'
    case 'green': return 'bg-green-500/30'
    case 'yellow': return 'bg-yellow-500/30'
    default: return 'bg-gray-500/30'
  }
}

export function FloatingNav({ activeFeature, setActiveFeature }: FloatingNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 1.2,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="relative">
        {/* Navigation Items */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-20 right-0 space-y-3"
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeFeature === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    className="relative group"
                  >
                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 0, x: 10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-gray-700/50 pointer-events-none"
                    >
                      {item.label}
                      <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700/50" />
                    </motion.div>

                    <Button
                      onClick={() => {
                        setActiveFeature(item.id);
                        setIsExpanded(false);
                      }}
                      className={`
                        w-14 h-14 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 relative overflow-hidden group border-2
                        ${getButtonClass(item.color, isActive)}
                      `}
                    >
                      {/* Background Glow */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${getGlowClass(item.color)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      />

                      {/* Icon */}
                      <Icon className="w-6 h-6 relative z-10" />

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className={`absolute inset-0 ${getActiveGlowClass(item.color)} rounded-2xl`}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-2xl border-0 relative overflow-hidden group transition-all duration-300"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Button Content */}
            <div className="relative z-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-7 h-7 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-7 h-7 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Button>

          {/* Pulsing Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />

          {/* Orbiting Particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0'
              }}
              animate={{
                rotate: [0, 360],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FloatingNav;