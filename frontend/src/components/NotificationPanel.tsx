import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Button } from './ui/button'

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Bet Won!',
    message: 'Your BlockFlight bet cashed out at 2.4x multiplier',
    time: '2 minutes ago',
    icon: CheckCircle
  },
  {
    id: 2,
    type: 'info',
    title: 'New Prediction',
    message: 'BTC > $70k by Friday? • YES 2.6× / NO 1.4×',
    time: '15 minutes ago',
    icon: Info
  },
  {
    id: 3,
    type: 'warning',
    title: 'High Volatility',
    message: 'ETH price volatility is 15% higher than usual',
    time: '1 hour ago',
    icon: AlertCircle
  }
]

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
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
                >
                  <Bell className="w-4 h-4 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold text-white">Notifications</h2>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {mockNotifications.map((notification, index) => {
                const Icon = notification.icon
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-4 rounded-lg bg-gray-800/50 border border-gray-700/30 hover:border-gray-600/50 transition-colors cursor-pointer group"
                  >
                    {/* Scan Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent rounded-lg"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-3">
                        <motion.div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            notification.type === 'success' ? 'bg-green-500/20 text-green-400' :
                            notification.type === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {notification.title}
                          </h3>
                          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700/50">
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
              >
                Mark All as Read
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}