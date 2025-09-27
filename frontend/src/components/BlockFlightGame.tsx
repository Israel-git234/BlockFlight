import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Play, Square } from 'lucide-react'

interface MarketData {
  ethPrice: number
  priceChange24h: number
  volatility: number
}

export function BlockFlightGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [multiplier, setMultiplier] = useState(1.00)
  const [betAmount, setBetAmount] = useState(0.01)
  const [gameHistory, setGameHistory] = useState<number[]>([])
  const [marketData, setMarketData] = useState<MarketData>({
    ethPrice: 0,
    priceChange24h: 0,
    volatility: 0
  })
  const [startPrice, setStartPrice] = useState<number>(0)

  // Fetch ETH price data from CoinGecko
  const fetchETHPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true')
      const data = await response.json()
      
      if (data.ethereum) {
        const ethPrice = data.ethereum.usd
        const priceChange24h = data.ethereum.usd_24h_change || 0
        const volatility = Math.abs(priceChange24h) / 100
        
        setMarketData({
          ethPrice,
          priceChange24h,
          volatility
        })
      }
    } catch (error) {
      console.error('Failed to fetch ETH price:', error)
      // Fallback to mock data
      setMarketData({
        ethPrice: 3500 + Math.random() * 200,
        priceChange24h: (Math.random() - 0.5) * 10,
        volatility: Math.random() * 0.1
      })
    }
  }

  // Fetch market data every 5 seconds
  useEffect(() => {
    fetchETHPrice()
    const interval = setInterval(fetchETHPrice, 5000)
    return () => clearInterval(interval)
  }, [])

  // Game logic with market influence
  useEffect(() => {
    if (!isPlaying) return

    const gameInterval = setInterval(() => {
      setMultiplier(prev => {
        const newMultiplier = prev + 0.01
        
        // Market-driven crash probability
        const baseCrashChance = 0.02
        const volatilityFactor = marketData.volatility * 0.5
        const priceChangeFactor = Math.abs(marketData.priceChange24h) / 1000
        const crashChance = baseCrashChance + volatilityFactor + priceChangeFactor
        
        // Higher multiplier = higher crash chance
        const dynamicCrashChance = crashChance * (1 + (newMultiplier - 1) * 0.1)
        
        if (Math.random() < dynamicCrashChance) {
          setIsPlaying(false)
          setGameHistory(prev => [newMultiplier, ...prev.slice(0, 9)])
          return 1.00
        }
        
        return newMultiplier
      })
    }, 100)

    return () => clearInterval(gameInterval)
  }, [isPlaying, marketData])

  const startGame = () => {
    setStartPrice(marketData.ethPrice)
    setIsPlaying(true)
    setMultiplier(1.00)
  }

  const cashOut = () => {
    if (isPlaying) {
      setIsPlaying(false)
      setGameHistory(prev => [multiplier, ...prev.slice(0, 9)])
      setMultiplier(1.00)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              background: 'linear-gradient(270deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            BlockFlight
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Market-driven crash game powered by real-time ETH volatility
          </motion.p>
        </motion.div>

        {/* Market Data Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'ETH Price', value: `$${marketData.ethPrice.toFixed(2)}`, color: 'text-blue-400' },
            { 
              label: '24h Change', 
              value: `${marketData.priceChange24h >= 0 ? '+' : ''}${marketData.priceChange24h.toFixed(2)}%`, 
              color: marketData.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400' 
            },
            { label: 'Volatility', value: `${(marketData.volatility * 100).toFixed(1)}%`, color: 'text-purple-400' },
            { label: 'Game Start Price', value: `$${startPrice.toFixed(2)}`, color: 'text-cyan-400' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm text-center"
            >
              <div className="text-sm text-gray-400 mb-1">{item.label}</div>
              <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Game Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <motion.div
            className="text-6xl md:text-8xl font-bold mb-6"
            animate={{ 
              color: isPlaying ? '#00ff88' : '#8b5cf6',
              textShadow: isPlaying 
                ? ['0 0 20px #00ff88', '0 0 40px #00ff88', '0 0 20px #00ff88']
                : ['0 0 20px #8b5cf6', '0 0 40px #8b5cf6', '0 0 20px #8b5cf6']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {multiplier.toFixed(2)}x
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0.01)}
              min="0.01"
              step="0.01"
              className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white text-center w-32"
              placeholder="Bet Amount (ETH)"
            />
            
            {!isPlaying ? (
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 text-lg font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Flight
              </Button>
            ) : (
              <Button
                onClick={cashOut}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-3 text-lg font-bold"
              >
                <Square className="w-5 h-5 mr-2" />
                Cash Out
              </Button>
            )}
          </div>
        </motion.div>

        {/* Game History */}
        {gameHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold text-gray-300 mb-4">Recent Crashes</h3>
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              {gameHistory.map((crash, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-2 rounded bg-gray-800/50 border border-gray-700/50 text-white font-bold"
                >
                  {crash.toFixed(2)}x
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}