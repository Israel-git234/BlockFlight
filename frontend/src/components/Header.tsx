import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, Wallet, Zap } from 'lucide-react';
import { WalletButton } from './WalletButton';

interface HeaderProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

export function Header({ showNotifications, setShowNotifications }: HeaderProps) {
  return (
    <header className="relative z-20 px-6 py-4 border-b border-gray-800/50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">✈️</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              BlockFlight
            </h1>
            <p className="text-xs text-gray-500">DeFi Gaming</p>
          </div>
        </motion.div>

        {/* Right Section - Notifications & Wallet */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center space-x-3"
        >
          {/* Notifications Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-700/50"
          >
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 min-w-[16px] h-4">
              3
            </Badge>
          </Button>

          {/* Wallet Connect */}
          <WalletButton />
        </motion.div>
      </div>
    </header>
  );
}

export default Header;