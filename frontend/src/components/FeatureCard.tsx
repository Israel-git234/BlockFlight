import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'

interface Feature {
  id: string
  icon: React.ComponentType<any>
  title: string
  description: string
  gradient: string
  glowColor: string
  status: string
  players: string
  volume: string
}

interface FeatureCardProps {
  feature: Feature
  isActive: boolean
  onClick: () => void
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'live':
      return 'bg-green-500 text-white animate-pulse'
    case 'soon':
      return 'bg-orange-500 text-white'
    default:
      return 'bg-blue-500 text-white'
  }
}

export function FeatureCard({ feature, isActive, onClick }: FeatureCardProps) {
  const Icon = feature.icon

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20' 
          : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50'
        }
        backdrop-blur-xl
      `}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        animate={{ 
          background: [
            'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(139, 92, 246, 0.1))',
            'linear-gradient(225deg, rgba(0, 255, 255, 0.1), rgba(139, 92, 246, 0.1))',
            'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(139, 92, 246, 0.1))'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-6 h-6 text-cyan-400" />
          </motion.div>
          <Badge 
            variant={feature.status === 'live' ? 'default' : 'secondary'}
            className={getStatusBadgeClass(feature.status)}
          >
            {feature.status.toUpperCase()}
          </Badge>
        </div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-2"
          animate={{ 
            textShadow: isActive 
              ? ['0 0 10px #00ffff', '0 0 20px #00ffff', '0 0 10px #00ffff']
              : ['0 0 0px transparent', '0 0 0px transparent', '0 0 0px transparent']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {feature.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>{feature.players} players</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>{feature.volume}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Active State Indicator */}
      {isActive && (
        <motion.div
          className="absolute inset-0 border-2 border-cyan-400 rounded-2xl"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(0, 255, 255, 0.3)',
              '0 0 40px rgba(0, 255, 255, 0.6)',
              '0 0 20px rgba(0, 255, 255, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}