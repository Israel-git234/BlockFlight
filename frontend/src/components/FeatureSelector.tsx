import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Plane, Users, Ship, Trophy, TrendingUp, DollarSign, Users as PlayersIcon, Zap } from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  status: string;
  statusColor: string;
  players: string;
  volume: string;
  gradient: string;
  glowColor: string;
}

interface FeatureSelectorProps {
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
}

const features: Feature[] = [
  {
    id: 'blockflight',
    icon: Plane,
    title: 'Flight Mode',
    description: 'Aviator-style crash game powered by real-time market data and blockchain technology',
    status: 'LIVE',
    statusColor: 'bg-green-500',
    players: '2,847',
    volume: '$1.2M',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'cyan-400'
  },
  {
    id: 'market',
    icon: Users,
    title: 'Social Predictions',
    description: 'Community-driven prediction markets on crypto, sports, politics, and more',
    status: 'ACTIVE',
    statusColor: 'bg-blue-500',
    players: '1,234',
    volume: '$890K',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'purple-400'
  },
  {
    id: 'cruise',
    icon: Ship,
    title: 'Cruise Mode',
    description: 'Long-term staking rewards journey with automated yield optimization strategies',
    status: 'SOON',
    statusColor: 'bg-orange-500',
    players: '0',
    volume: '$0',
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'green-400'
  },
  {
    id: 'leaderboard',
    icon: Trophy,
    title: 'Leaderboard',
    description: 'Global rankings showcasing top players, biggest wins, and community achievements',
    status: 'ACTIVE',
    statusColor: 'bg-blue-500',
    players: '5,678',
    volume: '$2.1M',
    gradient: 'from-yellow-500 to-orange-500',
    glowColor: 'yellow-400'
  }
];

const stats = [
  { label: 'Total Volume', value: '$2.4M+', color: 'text-cyan-400' },
  { label: 'Active Players', value: '4,278', color: 'text-purple-400' },
  { label: 'Games Played', value: '89,247', color: 'text-green-400' },
  { label: 'Total Rewards', value: '156.8 ETH', color: 'text-yellow-400' }
];

export function FeatureSelector({ activeFeature, setActiveFeature }: FeatureSelectorProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
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

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
          >
            Choose Your Game
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            BlockDAG Gaming Platform - Decentralized, transparent, and provably fair
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === feature.id;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFeature(feature.id)}
                className="cursor-pointer"
              >
                <Card className={`
                  relative overflow-hidden border transition-all duration-300 backdrop-blur-sm h-64
                  ${isActive 
                    ? 'border-cyan-400 bg-gray-900/80 shadow-lg shadow-cyan-500/20' 
                    : 'border-gray-700/50 bg-gray-900/40 hover:border-gray-600/70 hover:bg-gray-900/60'
                  }
                `}>
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0`}
                    animate={isActive ? { opacity: 0.1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Scan Line Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3,
                      ease: "linear"
                    }}
                  />

                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Header with Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={`${feature.statusColor} text-white text-xs px-2 py-1`}>
                        {feature.status}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-400">
                        <PlayersIcon className="w-4 h-4 mr-1" />
                        {feature.players}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {feature.volume}
                      </div>
                    </div>
                  </CardContent>

                  {/* Border Glow Animation */}
                  <motion.div
                    className={`absolute inset-0 border border-${feature.glowColor}/50 rounded-lg opacity-0`}
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
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:border-gray-600/50 transition-colors"
            >
              <motion.p
                className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

export default FeatureSelector;