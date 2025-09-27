import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Bell, TrendingUp, Users, Zap, Trophy, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: '1',
    type: 'win',
    title: 'Big Win Alert!',
    message: 'Player CryptoAce just hit 12.45x multiplier in BlockFlight!',
    time: '2m ago',
    icon: Trophy,
    color: 'green'
  },
  {
    id: '2',
    type: 'market',
    title: 'New Market Created',
    message: 'Will Bitcoin reach $100k by end of 2024? - 1,247 ETH volume',
    time: '5m ago',
    icon: TrendingUp,
    color: 'blue'
  },
  {
    id: '3',
    type: 'social',
    title: 'Community Update',
    message: 'New leaderboard rankings are live! Check your position.',
    time: '12m ago',
    icon: Users,
    color: 'purple'
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance completed. All systems operational.',
    time: '1h ago',
    icon: Zap,
    color: 'cyan'
  },
  {
    id: '5',
    type: 'alert',
    title: 'High Volume Alert',
    message: 'Unusual trading activity detected in ETH markets.',
    time: '2h ago',
    icon: AlertCircle,
    color: 'yellow'
  }
];

// Safe class mappings for dynamic colors
const iconBgClass: Record<string, string> = {
  green: 'bg-green-500/20',
  blue: 'bg-blue-500/20',
  purple: 'bg-purple-500/20',
  cyan: 'bg-cyan-500/20',
  yellow: 'bg-yellow-500/20'
};

const iconTextClass: Record<string, string> = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  cyan: 'text-cyan-400',
  yellow: 'text-yellow-400'
};

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed top-0 right-0 h-full w-96 z-50 bg-gray-900/95 backdrop-blur-lg border-l border-gray-700/50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-6 h-6 text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Notifications</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-1">Stay updated with the latest activity</p>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50 transition-colors cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-lg ${iconBgClass[notification.color]} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-5 h-5 ${iconTextClass[notification.color]}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors">
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-700/50">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                  >
                    Mark All Read
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-y-0 -left-1 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-green-400 opacity-60" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default NotificationPanel;