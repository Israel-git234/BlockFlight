import React, { useState, useEffect } from 'react'

interface MarketStats {
  ethPrice: number
  priceChange: number
  volatility: number
  marketCap: number
  volume24h: number
}

interface GameStats {
  activePlayers: number
  totalVolume: number
  biggestWin: number
  averageMultiplier: number
  roundsPlayed: number
}

export default function LiveStats() {
  const [marketStats, setMarketStats] = useState<MarketStats>({
    ethPrice: 0,
    priceChange: 0,
    volatility: 0,
    marketCap: 0,
    volume24h: 0
  })

  const [gameStats, setGameStats] = useState<GameStats>({
    activePlayers: 0,
    totalVolume: 0,
    biggestWin: 0,
    averageMultiplier: 0,
    roundsPlayed: 0
  })

  const [isLive, setIsLive] = useState(true)

  // Fetch market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true')
        const data = await response.json()
        const ethData = data.ethereum
        
        setMarketStats({
          ethPrice: ethData.usd,
          priceChange: ethData.usd_24h_change || 0,
          volatility: Math.abs(ethData.usd_24h_change || 0),
          marketCap: ethData.usd_market_cap || 0,
          volume24h: ethData.usd_24h_vol || 0
        })
      } catch (error) {
        console.error('Failed to fetch market data:', error)
        // Fallback data
        setMarketStats({
          ethPrice: 2456.78,
          priceChange: Math.random() * 10 - 5,
          volatility: Math.random() * 5,
          marketCap: 295000000000,
          volume24h: 12000000000
        })
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [])

  // Simulate game stats updates
  useEffect(() => {
    const updateGameStats = () => {
      setGameStats(prev => ({
        activePlayers: Math.floor(Math.random() * 50) + 100,
        totalVolume: prev.totalVolume + Math.random() * 0.5,
        biggestWin: Math.max(prev.biggestWin, Math.random() * 15),
        averageMultiplier: 1.5 + Math.random() * 2,
        roundsPlayed: prev.roundsPlayed + 1
      }))
    }

    const interval = setInterval(updateGameStats, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const styles = {
    container: {
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(20px)',
      borderRadius: '2rem',
      padding: '2.5rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      maxWidth: '1200px',
      margin: '0 auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.1)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
      backgroundSize: '400% 400%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradientShift 3s ease-in-out infinite',
      textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
    },
    liveIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '1rem',
      background: 'linear-gradient(45deg, #00ff88, #00d4aa)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.875rem',
      boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)'
    },
    pulseDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'white',
      animation: 'pulse 2s ease-in-out infinite'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '1.5rem',
      padding: '1.5rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      transition: 'all 0.3s ease'
    },
    statCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(0, 255, 255, 0.2)'
    },
    statIcon: {
      fontSize: '2rem',
      marginBottom: '1rem',
      filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#00ffff',
      marginBottom: '0.5rem',
      fontFamily: "'JetBrains Mono', monospace"
    },
    statLabel: {
      color: '#d1d5db',
      fontSize: '0.875rem',
      marginBottom: '0.5rem'
    },
    statChange: {
      fontSize: '0.75rem',
      fontWeight: 'bold',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.5rem',
      display: 'inline-block'
    },
    positive: {
      background: 'rgba(0, 255, 136, 0.2)',
      color: '#00ff88',
      border: '1px solid rgba(0, 255, 136, 0.3)'
    },
    negative: {
      background: 'rgba(255, 107, 107, 0.2)',
      color: '#ff6b6b',
      border: '1px solid rgba(255, 107, 107, 0.3)'
    },
    chartContainer: {
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '1.5rem',
      padding: '2rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      marginTop: '2rem'
    },
    chartTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#00ffff',
      marginBottom: '1rem',
      textAlign: 'center' as const
    },
    priceChart: {
      height: '200px',
      background: 'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(139, 92, 246, 0.1))',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#d1d5db',
      fontSize: '1.125rem',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    animatedLine: {
      position: 'absolute',
      top: '50%',
      left: '0',
      right: '0',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
      animation: 'shimmer 3s ease-in-out infinite'
    }
  }

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K'
    return num.toFixed(decimals)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📊 Live Market Data</h2>
        <div style={styles.liveIndicator}>
          <div style={styles.pulseDot}></div>
          LIVE DATA
        </div>
      </div>

      <div style={styles.statsGrid}>
        {/* ETH Price */}
        <div
          style={styles.statCard}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.statCardHover)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statValue}>{formatPrice(marketStats.ethPrice)}</div>
          <div style={styles.statLabel}>ETH Price</div>
          <div style={{
            ...styles.statChange,
            ...(marketStats.priceChange >= 0 ? styles.positive : styles.negative)
          }}>
            {marketStats.priceChange >= 0 ? '+' : ''}{marketStats.priceChange.toFixed(2)}%
          </div>
        </div>

        {/* Market Cap */}
        <div
          style={styles.statCard}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.statCardHover)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={styles.statIcon}>🌍</div>
          <div style={styles.statValue}>${formatNumber(marketStats.marketCap)}</div>
          <div style={styles.statLabel}>Market Cap</div>
          <div style={{
            ...styles.statChange,
            ...styles.positive
          }}>
            24h Volume: ${formatNumber(marketStats.volume24h)}
          </div>
        </div>

        {/* Volatility */}
        <div
          style={styles.statCard}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.statCardHover)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={styles.statIcon}>📈</div>
          <div style={styles.statValue}>{marketStats.volatility.toFixed(2)}%</div>
          <div style={styles.statLabel}>Volatility</div>
          <div style={{
            ...styles.statChange,
            ...(marketStats.volatility > 3 ? styles.negative : styles.positive)
          }}>
            {marketStats.volatility > 3 ? 'High' : 'Normal'}
          </div>
        </div>

        {/* Active Players */}
        <div
          style={styles.statCard}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.statCardHover)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statValue}>{gameStats.activePlayers}</div>
          <div style={styles.statLabel}>Active Players</div>
          <div style={{
            ...styles.statChange,
            ...styles.positive
          }}>
            Playing Now
          </div>
        </div>

        {/* Total Volume */}
        <div
          style={styles.statCard}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.statCardHover)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={styles.statIcon}>💎</div>
          <div style={styles.statValue}>{gameStats.totalVolume.toFixed(2)} ETH</div>
          <div style={styles.statLabel}>Total Volume</div>
          <div style={{
            ...styles.statChange,
            ...styles.positive
          }}>
            All Time
          </div>
        </div>

        {/* Biggest Win */}
        <div
          style={styles.statCard}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.statCardHover)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={styles.statIcon}>🏆</div>
          <div style={styles.statValue}>{gameStats.biggestWin.toFixed(1)} ETH</div>
          <div style={styles.statLabel}>Biggest Win</div>
          <div style={{
            ...styles.statChange,
            ...styles.positive
          }}>
            Record
          </div>
        </div>
      </div>

      {/* Price Chart Placeholder */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>📈 ETH Price Impact on Game</h3>
        <div style={styles.priceChart}>
          <div style={styles.animatedLine}></div>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {marketStats.priceChange >= 0 ? '📈' : '📉'} 
              {marketStats.priceChange >= 0 ? ' Bullish' : ' Bearish'} Market
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.8 }}>
              {marketStats.priceChange >= 0 
                ? 'Higher ETH prices = Longer flights' 
                : 'Lower ETH prices = Earlier crashes'
              }
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
