import { useState, useEffect } from 'react'

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

function App() {
  const [selectedFeature, setSelectedFeature] = useState<string>('market-aviator')
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
      name: 'Market Aviator',
      description: 'Predict market volatility in this crash game',
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
    },
    {
      id: 'leaderboard',
      name: 'Leaderboard',
      description: 'Compete with top players and unlock achievements',
      icon: '🏆',
      status: 'Live',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const renderFeature = () => {
    switch (selectedFeature) {
      case 'market-aviator':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <MarketAviator account={account} chainId={chainId} />
            <LiveStats />
          </div>
        )
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
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <MarketAviator account={account} chainId={chainId} />
            <LiveStats />
          </div>
        )
    }
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e, #0f3460, #533483)',
      color: 'white',
      fontFamily: "'Inter', system-ui, sans-serif",
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    header: {
      background: 'rgba(0,0,0,0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
      padding: '1rem 0',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0, 255, 255, 0.1)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logoIcon: {
      fontSize: '2.5rem',
      animation: 'float 3s ease-in-out infinite',
      filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
    },
    logoText: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
      backgroundSize: '400% 400%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradientShift 3s ease-in-out infinite',
      textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
    },
    subtitle: {
      fontSize: '0.875rem',
      color: '#a855f7',
      fontWeight: '500'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    networkBadge: {
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      background: chainId === 1043 ? 'linear-gradient(45deg, #10b981, #059669)' : 
                  'linear-gradient(45deg, #f59e0b, #d97706)',
      color: 'white'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1.5rem'
    },
    featureSelectorWrapper: {
      marginBottom: '2rem'
    }
  }

  return (
    <NotificationsProvider>
    <div style={styles.container}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        zIndex: 1
      }} />

      {/* Grid Pattern Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 1
      }} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🚀</div>
            <div>
              <div style={styles.logoText}>BlockFlight</div>
              <div style={styles.subtitle}>Market-Driven Prediction Platform</div>
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <div style={styles.networkBadge}>
              {chainId === 1043 ? '✅ BlockDAG' : '⚠️ Switch Network'}
            </div>
            <NotificationBell />
            <WalletConnect account={account} setAccount={setAccount} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Feature Selector */}
        <div style={styles.featureSelectorWrapper}>
          <FeatureSelector 
            features={features}
            selectedFeature={selectedFeature}
            onSelectFeature={setSelectedFeature}
          />
        </div>

        {/* Selected Feature */}
        {renderFeature()}
      </main>

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.6); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        button:hover {
          transform: translateY(-2px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #00ffff, #8b5cf6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #22d3ee, #a855f7);
        }
      `}</style>
    </div>
    </NotificationsProvider>
  )
}

export default App