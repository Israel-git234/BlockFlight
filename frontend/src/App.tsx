import { useState, useEffect } from 'react'

// Feature Components
import MarketAviator from './features/MarketAviator'
import CruiseMode from './features/CruiseMode'
import TradingPools from './features/TradingPools'
import NFTRewards from './features/NFTRewards'
import CommunityMarket from './features/CommunityMarket'

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
    }
  ]

  const renderFeature = () => {
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
      default:
        return <MarketAviator account={account} chainId={chainId} />
    }
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e293b, #7c3aed, #1e293b, #0f172a)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    },
    header: {
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
      padding: '1rem 0',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100
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
      animation: 'float 3s ease-in-out infinite'
    },
    logoText: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #7c3aed, #ec4899, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
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
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
          50% { box-shadow: 0 0 30px rgba(124, 58, 237, 0.6); }
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          overflow-x: hidden;
        }

        button:hover {
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
    </NotificationsProvider>
  )
}

export default App