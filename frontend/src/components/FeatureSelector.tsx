import React from 'react';
import { FeatureCard } from './FeatureCard';
import { Plane, Users, Ship, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureSelectorProps {
  features: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    status: string;
    color: string;
  }>;
  selectedFeature: string;
  onSelectFeature: (featureId: string) => void;
}

const figmaFeatures = [
  {
    id: 'blockflight',
    icon: Plane,
    title: 'Flight Mode',
    description: 'Aviator-style crash game powered by real-time market volatility and blockchain transparency',
    gradient: 'from-cyan-500 via-blue-500 to-cyan-600',
    glowColor: 'cyan-400',
    status: 'live',
    players: '1,247',
    volume: '12.4 ETH'
  },
  {
    id: 'market',
    icon: Users,
    title: 'Social Predictions',
    description: 'Community-driven prediction markets on crypto, sports, weather, and global events',
    gradient: 'from-purple-500 via-pink-500 to-purple-600',
    glowColor: 'purple-400',
    status: 'active',
    players: '892',
    volume: '8.7 ETH'
  },
  {
    id: 'cruise',
    icon: Ship,
    title: 'Cruise Mode',
    description: 'Long-term staking rewards journey with automated yield optimization strategies',
    gradient: 'from-green-500 via-emerald-500 to-green-600',
    glowColor: 'green-400',
    status: 'soon',
    players: '--',
    volume: 'Coming Soon'
  },
  {
    id: 'leaderboard',
    icon: Trophy,
    title: 'Leaderboard',
    description: 'Global rankings showcasing top players, biggest wins, and community achievements',
    gradient: 'from-yellow-500 via-orange-500 to-yellow-600',
    glowColor: 'yellow-400',
    status: 'active',
    players: '2,139',
    volume: '45.2 ETH'
  }
];

export function FeatureSelector({ selectedFeature, onSelectFeature }: FeatureSelectorProps) {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Compact Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-center mb-8 relative"
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 relative"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            background: 'linear-gradient(270deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Choose Your Game
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          BlockDAG Gaming Platform - Decentralized, transparent, and provably fair
        </motion.p>
      </motion.div>

      {/* Compact Feature Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8"
      >
        {figmaFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.05 * index,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            <FeatureCard
              feature={feature}
              isActive={selectedFeature === feature.id}
              onClick={() => onSelectFeature(selectedFeature === feature.id ? '' : feature.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Compact Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
      >
        {[
          { label: 'Total Volume', value: '$2.4M+', color: 'cyan' },
          { label: 'Active Players', value: '4,278', color: 'purple' },
          { label: 'Games Played', value: '89,247', color: 'green' },
          { label: 'Total Rewards', value: '156.8 ETH', color: 'yellow' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-3 rounded-lg bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              borderColor: `var(--color-${stat.color}-400)`
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            <motion.p 
              className={`text-lg md:text-xl font-bold mb-1 text-${stat.color}-400`}
              animate={{ 
                textShadow: [
                  `0 0 3px var(--color-${stat.color}-400)`,
                  `0 0 8px var(--color-${stat.color}-400)`,
                  `0 0 3px var(--color-${stat.color}-400)`
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              {stat.value}
            </motion.p>
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}