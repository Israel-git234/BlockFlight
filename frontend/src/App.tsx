import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Feature Components
import MarketAviator from './features/MarketAviator'
import CruiseMode from './features/CruiseMode'
import TradingPools from './features/TradingPools'
import NFTRewards from './features/NFTRewards'
import CommunityMarket from './features/CommunityMarket'
import Leaderboard from './features/Leaderboard'
import LiveStats from './features/LiveStats'

// Components
import WalletConnect from './components/WalletConnect'
import FeatureSelector from './components/FeatureSelector'
import { NotificationsProvider } from './components/NotificationsProvider'
import NotificationBell from './components/NotificationBell'

type Screen = 'dashboard' | 'market-aviator' | 'community-market' | 'cruise-mode' | 'trading-pools' | 'nft-rewards' | 'leaderboard';

function App() {
  const [selectedFeature, setSelectedFeature] = useState<Screen>('dashboard')
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  // MetaMask connection handler
  useEffect(() => {
    if (window.ethereum) {
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
          }
        })

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(parseInt(chainId, 16))
      })

      // Get current chain ID
      window.ethereum.request({ method: 'eth_chainId' })
        .then((chainId: string) => {
          setChainId(parseInt(chainId, 16))
        })
    }
  }, [])

  const features = [
    {
      id: 'market-aviator',
      name: 'BlockFlight',
      description: 'Market-driven crash game powered by ETH volatility',
      icon: '✈️',
      status: 'Live',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'community-market',
      name: 'Community Market',
      description: 'Create and bet on custom real‑world predictions',
      icon: '🧠',
      status: 'Live',
      color: 'from-amber-500 to-fuchsia-500'
    },
    {
      id: 'cruise-mode',
      name: 'Cruise Mode',
      description: 'Long-term staking based on market trends',
      icon: '🚢',
      status: 'Live',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'leaderboard',
      name: 'Leaderboard',
      description: 'Compete with top players and unlock achievements',
      icon: '🏆',
      status: 'Live',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'trading-pools',
      name: 'Trading Pools',
      description: 'Collaborative prediction pools',
      icon: '🏊',
      status: 'Coming Soon',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'nft-rewards',
      name: 'NFT Rewards',
      description: 'Earn unique NFTs for big wins',
      icon: '🏆',
      status: 'Coming Soon',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const renderContent = () => {
    switch (selectedFeature) {
      case 'market-aviator':
        return <MarketAviator account={account} chainId={chainId} />
      case 'cruise-mode':
        return <CruiseMode account={account} chainId={chainId} />
      case 'community-market':
        return <CommunityMarket account={account} />
      case 'trading-pools':
        return <TradingPools account={account} chainId={chainId} />
      case 'nft-rewards':
        return <NFTRewards account={account} chainId={chainId} />
      case 'leaderboard':
        return <Leaderboard />
      case 'dashboard':
      default:
        return <FeatureSelector 
          features={features}
          selectedFeature={selectedFeature}
          onSelectFeature={setSelectedFeature}
        />
    }
  }

  return (
    <NotificationsProvider>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Subtle Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1676818038422-1241ccf391bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eSUyMGRhcmt8ZW58MXx8fHwxNzU4OTkxMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        
        {/* Simple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        
        {/* Minimal Grid Pattern */}
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

        {/* Header */}
        <header className="bg-black/90 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setSelectedFeature('dashboard')}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="text-4xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  BlockFlight
                </h1>
                <p className="text-sm text-gray-400">Market-Driven Prediction Platform</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              {/* Navigation */}
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFeature === 'dashboard' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedFeature('dashboard')}
                >
                  🏠 Dashboard
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFeature === 'market-aviator' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedFeature('market-aviator')}
                >
                  ✈️ BlockFlight
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFeature === 'community-market' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedFeature('community-market')}
                >
                  🧠 Market
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFeature === 'leaderboard' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedFeature('leaderboard')}
                >
                  🏆 Leaderboard
                </button>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                chainId === 1043 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              }`}>
                {chainId === 1043 ? '✅ BlockDAG' : '⚠️ Switch Network'}
              </div>
              
              <NotificationBell />
              <WalletConnect account={account} setAccount={setAccount} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.05 }}
              transition={{ 
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Subtle Ambient Glow */}
        <div className="fixed top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </NotificationsProvider>
  )
}

export default App