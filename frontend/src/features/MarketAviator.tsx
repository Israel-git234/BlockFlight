import React, { useEffect, useState } from 'react'

type MarketAviatorProps = {
  account: string | null
  chainId: number | null
}

const MarketAviator: React.FC<MarketAviatorProps> = ({ account, chainId }) => {
  const [multiplier, setMultiplier] = useState<number>(1.0)
  const [isFlying, setIsFlying] = useState<boolean>(false)
  const [crashed, setCrashed] = useState<boolean>(false)

  useEffect(() => {
    if (!isFlying || crashed) return
    const id = setInterval(() => {
      setMultiplier(prev => {
        const next = +(prev + 0.01 + Math.random() * 0.01).toFixed(2)
        if (next > 1.1 && Math.random() < 0.02) {
          setCrashed(true)
          setIsFlying(false)
          return next
        }
        return next
      })
    }, 100)
    return () => clearInterval(id)
  }, [isFlying, crashed])

  const start = () => {
    setMultiplier(1.0)
    setCrashed(false)
    setIsFlying(true)
  }

  const stop = () => {
    setIsFlying(false)
  }

  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: 12,
      padding: 24
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>Account: {account ? `${account.slice(0, 6)}…${account.slice(-4)}` : 'Not connected'}</div>
        <div>Network: {chainId ?? 'Unknown'}</div>
      </div>
      <div style={{
        fontFamily: 'monospace',
        fontSize: 48,
        fontWeight: 700,
        color: crashed ? '#f87171' : '#34d399',
        textAlign: 'center',
        marginBottom: 16
      }}>
        {multiplier.toFixed(2)}x {crashed ? '💥' : '🚀'}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={start} disabled={isFlying} style={{ padding: '10px 16px', borderRadius: 8, background: '#7c3aed', color: '#fff', border: 'none' }}>
          Start
        </button>
        <button onClick={stop} disabled={!isFlying} style={{ padding: '10px 16px', borderRadius: 8, background: '#6b7280', color: '#fff', border: 'none' }}>
          Stop
        </button>
      </div>
    </div>
  )
}

export default MarketAviator


