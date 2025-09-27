import { useState, useEffect } from 'react'

interface MarketAviatorProps {
  account: string | null
  chainId: number | null
}

interface MarketData {
  ethPrice: number
  priceChange: number
  volatility: number
  timestamp: number
}

export default function MarketAviator({ account, chainId }: MarketAviatorProps) {
  const [betAmount, setBetAmount] = useState('0.01')
  const [userBet, setUserBet] = useState<{amount: number, active: boolean}>({amount: 0, active: false})
  const [isLoading, setIsLoading] = useState(false)
  const [multiplier, setMultiplier] = useState(1.00)
  const [isFlying, setIsFlying] = useState(false)
  const [crashed, setCrashed] = useState(false)
  const [cashOutAmount, setCashOutAmount] = useState(0)
  const [gameHistory, setGameHistory] = useState<number[]>([])
  const [roundNumber, setRoundNumber] = useState(1)
  const [marketData, setMarketData] = useState<MarketData>({
    ethPrice: 0,
    priceChange: 0,
    volatility: 0,
    timestamp: 0
  })
  const [startPrice, setStartPrice] = useState(0)

  // Fetch ETH price data
  useEffect(() => {
    const fetchETHPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true')
        const data = await response.json()
        const ethData = data.ethereum
        
        setMarketData(prev => ({
          ethPrice: ethData.usd,
          priceChange: ethData.usd_24h_change || 0,
          volatility: Math.abs(ethData.usd_24h_change || 0),
          timestamp: Date.now()
        }))
      } catch (error) {
        console.error('Failed to fetch ETH price:', error)
        // Fallback to mock data for demo
        setMarketData({
          ethPrice: 2456.78,
          priceChange: Math.random() * 10 - 5, // Random -5% to +5%
          volatility: Math.random() * 5,
          timestamp: Date.now()
        })
      }
    }

    fetchETHPrice()
    const interval = setInterval(fetchETHPrice, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Market-driven crash game logic
  useEffect(() => {
    const startNewRound = () => {
      setIsFlying(true)
      setCrashed(false)
      setMultiplier(1.00)
      setUserBet({ amount: 0, active: false })
      setCashOutAmount(0)
      setStartPrice(marketData.ethPrice) // Capture starting ETH price
      
      let currentMult = 1.00
      let crashProbability = 0.01 // Base crash probability
      
      const interval = setInterval(() => {
        currentMult += 0.01 + Math.random() * 0.05
        
        // Market-driven crash probability
        if (startPrice > 0) {
          const currentPriceChange = ((marketData.ethPrice - startPrice) / startPrice) * 100
          
          // Higher volatility = higher crash probability
          crashProbability = 0.01 + (marketData.volatility / 1000) // Scale volatility
          
          // Sudden price drops increase crash chance
          if (currentPriceChange < -2) {
            crashProbability += 0.05 // +5% crash chance on -2% price drop
          }
          
          // Price spikes can extend flight
          if (currentPriceChange > 2) {
            crashProbability *= 0.5 // Half crash chance on +2% price spike
          }
        }
        
        setMultiplier(currentMult)
        
        // Market-driven crash
        if (Math.random() < crashProbability && currentMult > 1.1) {
          setCrashed(true)
          setIsFlying(false)
          clearInterval(interval)
          
          // Add to history
          setGameHistory(prev => [currentMult, ...prev.slice(0, 9)])
          setRoundNumber(prev => prev + 1)
          
          // Start new round after 3 seconds
          setTimeout(() => {
            startNewRound()
          }, 3000)
        }
      }, 100)
    }

    // Start the first round
    startNewRound()
  }, [marketData])

  const placeBet = () => {
    if (!account) {
      alert('Please connect your wallet first!')
      return
    }
    
    if (parseFloat(betAmount) <= 0) {
      alert('Please enter a valid bet amount!')
      return
    }
    
    if (crashed) {
      alert('Round has ended! Wait for the next round.')
      return
    }
    
    setUserBet({ amount: parseFloat(betAmount), active: true })
    alert(`Bet placed: ${betAmount} ETH! Good luck!`)
  }

  const cashOut = () => {
    if (!userBet.active || crashed) return
    
    const payout = userBet.amount * multiplier
    setCashOutAmount(payout)
    setUserBet({ amount: 0, active: false })
    alert(`Cashed out at ${multiplier.toFixed(2)}x! You won ${payout.toFixed(4)} ETH!`)
  }

  const styles = {
    container: {
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1.5rem',
      padding: '2rem',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #ef4444, #f97316)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center' as const
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#d1d5db',
      textAlign: 'center' as const,
      marginBottom: '2rem'
    },
    gameArea: {
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '1rem',
      padding: '2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(239, 68, 68, 0.2)'
    },
    multiplier: {
      fontSize: '4rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      marginBottom: '1rem',
      color: isFlying ? '#22c55e' : '#ef4444',
      textShadow: isFlying ? '0 0 20px rgba(34, 197, 94, 0.5)' : 'none'
    },
    plane: {
      fontSize: '3rem',
      textAlign: 'center' as const,
      marginBottom: '1rem',
      animation: isFlying ? 'fly 2s ease-in-out infinite' : 'none'
    },
    status: {
      textAlign: 'center' as const,
      fontSize: '1.125rem',
      marginBottom: '1rem',
      color: isFlying ? '#22c55e' : '#ef4444'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      flexWrap: 'wrap' as const
    },
    input: {
      background: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(239, 68, 68, 0.5)',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      color: 'white',
      fontSize: '1rem',
      flex: 1,
      minWidth: '120px'
    },
    button: {
      background: 'linear-gradient(45deg, #ef4444, #dc2626)',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.75rem 1.5rem',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease'
    },
    cashOutButton: {
      background: 'linear-gradient(45deg, #22c55e, #16a34a)',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.75rem 1.5rem',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease'
    },
    disabledButton: {
      background: 'rgba(107, 114, 128, 0.5)',
      cursor: 'not-allowed',
      opacity: 0.5
    },
    info: {
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '0.5rem',
      padding: '1rem',
      fontSize: '0.875rem',
      color: '#d1d5db',
      marginBottom: '1rem'
    },
    history: {
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '0.5rem',
      padding: '1rem',
      fontSize: '0.875rem',
      color: '#d1d5db'
    },
    historyItem: {
      display: 'inline-block',
      background: 'rgba(239, 68, 68, 0.2)',
      borderRadius: '0.25rem',
      padding: '0.25rem 0.5rem',
      margin: '0.125rem',
      fontSize: '0.75rem'
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✈️ BlockFlight</h2>
      <p style={styles.subtitle}>
        Market-driven crash game! ETH price volatility affects when the plane crashes!
      </p>

      <div style={styles.gameArea}>
        <div style={styles.plane}>✈️</div>
        <div style={styles.multiplier}>{multiplier.toFixed(2)}x</div>
        <div style={styles.status}>
          {isFlying ? '🟢 Flying - Place your bets!' : '🔴 Crashed - Round ended'}
        </div>

        <div style={styles.controls}>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Bet amount (ETH)"
            step="0.01"
            min="0.01"
            style={styles.input}
            disabled={crashed}
          />
          <button
            onClick={placeBet}
            disabled={crashed || isLoading || !account || userBet.active}
            style={{
              ...styles.button,
              ...((crashed || isLoading || !account || userBet.active) ? styles.disabledButton : {})
            }}
          >
            {isLoading ? 'Placing...' : userBet.active ? 'Bet Active' : 'Place Bet'}
          </button>
          <button
            onClick={cashOut}
            disabled={!userBet.active || crashed || isLoading}
            style={{
              ...styles.cashOutButton,
              ...((!userBet.active || crashed || isLoading) ? styles.disabledButton : {})
            }}
          >
            {isLoading ? 'Cashing...' : 'Cash Out'}
          </button>
        </div>

        <div style={styles.info}>
          <div><strong>Round #{roundNumber}</strong></div>
          <div><strong>Your bet:</strong> {userBet.active ? `${userBet.amount} ETH` : 'None'}</div>
          <div><strong>Status:</strong> {userBet.active ? 'Active' : 'No bet'}</div>
          {cashOutAmount > 0 && <div><strong>Last payout:</strong> {cashOutAmount.toFixed(4)} ETH</div>}
          <div style={{marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(239, 68, 68, 0.2)'}}>
            <div><strong>📊 Market Data:</strong></div>
            <div>ETH Price: ${marketData.ethPrice.toFixed(2)}</div>
            <div>24h Change: <span style={{color: marketData.priceChange >= 0 ? '#22c55e' : '#ef4444'}}>
              {marketData.priceChange >= 0 ? '+' : ''}{marketData.priceChange.toFixed(2)}%
            </span></div>
            <div>Volatility: {marketData.volatility.toFixed(2)}%</div>
            {isFlying && startPrice > 0 && (
              <div>Game Start Price: ${startPrice.toFixed(2)}</div>
            )}
          </div>
          {!account && <div style={{color: '#ef4444', marginTop: '0.5rem'}}>⚠️ Connect wallet to place bets</div>}
        </div>

        {gameHistory.length > 0 && (
          <div style={styles.history}>
            <div><strong>Recent crashes:</strong></div>
            <div>
              {gameHistory.map((mult, index) => (
                <span key={index} style={styles.historyItem}>
                  {mult.toFixed(2)}x
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fly {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}