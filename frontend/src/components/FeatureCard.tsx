import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { LucideIcon, Users, DollarSign } from 'lucide-react';

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  glowColor: string;
  status: string;
  players: string;
  volume: string;
}

interface FeatureCardProps {
  feature: Feature;
  isActive: boolean;
  onClick: () => void;
}

export function FeatureCard({ feature, isActive, onClick }: FeatureCardProps) {
  const { icon: Icon, title, description, gradient, glowColor, status, players, volume } = feature;

  return (
    <motion.div
      whileHover={{ 
        y: -4,
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <Card className={`
        relative overflow-hidden border transition-all duration-300 backdrop-blur-sm h-48
        ${isActive 
          ? `border-${glowColor} bg-gray-900/80 shadow-lg` 
          : 'border-gray-700/50 bg-gray-900/40 hover:border-gray-600/70'
        }
      `}>
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300`}
          animate={{ 
            opacity: isActive ? 0.1 : 0
          }}
        />

        {/* Scan Line Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={isActive ? {
            x: ['-100%', '100%'],
            opacity: [0, 1, 0]
          } : {}}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            repeatDelay: 3
          }}
        />

        <div className="relative z-10 p-4 h-full flex flex-col">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-3">
            <motion.div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md relative overflow-hidden`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-5 h-5 text-white relative z-10" />
            </motion.div>
            
            {/* Status Badge */}
            <Badge 
              className={`${
                status === 'live' ? 'bg-green-500 text-white text-xs' :
                status === 'active' ? 'bg-blue-500 text-white text-xs' :
                status === 'soon' ? 'bg-orange-500 text-white text-xs' :
                'bg-gray-500 text-white text-xs'
              } px-2 py-1`}
            >
              {status === 'live' ? 'LIVE' : 
               status === 'active' ? 'ACTIVE' : 
               status === 'soon' ? 'SOON' : 'OFFLINE'}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-gray-800/30 rounded p-2 border border-gray-700/50">
              <div className="flex items-center space-x-1 mb-1">
                <Users className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-gray-400">Players</span>
              </div>
              <p className="font-mono font-bold text-white text-sm">{players}</p>
            </div>
            <div className="bg-gray-800/30 rounded p-2 border border-gray-700/50">
              <div className="flex items-center space-x-1 mb-1">
                <DollarSign className="w-3 h-3 text-green-400" />
                <span className="text-xs text-gray-400">Volume</span>
              </div>
              <p className="font-mono font-bold text-white text-xs">{volume}</p>
            </div>
          </div>
        </div>

        {/* Border Glow Animation */}
        <motion.div
          className={`absolute inset-0 border border-${glowColor}/50 rounded-lg opacity-0`}
          animate={isActive ? { 
            opacity: [0, 0.8, 0]
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: isActive ? Infinity : 0 
          }}
        />
      </Card>
    </motion.div>
  );
}