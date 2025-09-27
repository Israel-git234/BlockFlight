import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Filter, TrendingUp, Users, Clock, Star } from 'lucide-react';

interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  volume: number;
  participants: number;
  endDate: string;
  yesPrice: number;
  noPrice: number;
  yesShares: number;
  noShares: number;
  isFeatured: boolean;
}

export function CommunityMarket() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Crypto', 'Politics', 'Technology', 'Sports', 'Weather'];
  
  const markets: Market[] = [
    {
      id: '1',
      title: 'Will ETH reach $5000 by end of 2024?',
      description: 'Ethereum price prediction for end of year 2024',
      category: 'Crypto',
      volume: 145.2,
      participants: 847,
      endDate: '12/31/2024',
      yesPrice: 0.68,
      noPrice: 0.32,
      yesShares: 2100,
      noShares: 950,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Will Bitcoin ETF approval drive BTC above $100k?',
      description: 'Bitcoin price reaction to potential ETF approval',
      category: 'Crypto',
      volume: 89.7,
      participants: 432,
      endDate: '12/15/2024',
      yesPrice: 0.45,
      noPrice: 0.55,
      yesShares: 1200,
      noShares: 1450,
      isFeatured: false
    }
  ];

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalStats = {
    activeMarkets: 24,
    totalVolume: 1247,
    totalTraders: 3402,
    marketsResolved: 156
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-400" />
                Community Market
              </h1>
              <p className="text-gray-400 text-lg">
                Create and trade prediction markets on any topic
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
              <Star className="w-5 h-5 mr-2" />
              Create Market
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{totalStats.activeMarkets}</p>
                    <p className="text-sm text-gray-400">Active Markets</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{totalStats.totalVolume} ETH</p>
                    <p className="text-sm text-gray-400">Total Volume</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{totalStats.totalTraders.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Total Traders</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{totalStats.marketsResolved}</p>
                    <p className="text-sm text-gray-400">Markets Resolved</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={
                    selectedCategory === category
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Markets Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredMarkets.map((market, index) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex space-x-2">
                      <Badge className="bg-blue-500 text-white">{market.category}</Badge>
                      {market.isFeatured && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Volume</p>
                      <p className="text-lg font-semibold text-white">{market.volume} ETH</p>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-white mb-2">
                    {market.title}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    {market.description}
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Prediction Options */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">${market.yesPrice.toFixed(2)}</p>
                        <p className="text-sm text-gray-300">YES</p>
                        <p className="text-xs text-gray-400">{market.yesShares} shares</p>
                      </div>
                    </div>
                    
                    <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-400">${market.noPrice.toFixed(2)}</p>
                        <p className="text-sm text-gray-300">NO</p>
                        <p className="text-xs text-gray-400">{market.noShares} shares</p>
                      </div>
                    </div>
                  </div>

                  {/* Market Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">YES</span>
                      <span className="text-sm text-white font-semibold">
                        {((market.yesShares / (market.yesShares + market.noShares)) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ 
                          width: `${(market.yesShares / (market.yesShares + market.noShares)) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">NO</span>
                      <span className="text-sm text-white font-semibold">
                        {((market.noShares / (market.yesShares + market.noShares)) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Market Info */}
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {market.participants} participants
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Ends {market.endDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default CommunityMarket;
