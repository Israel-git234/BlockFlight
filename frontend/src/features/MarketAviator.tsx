import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMarketData } from '../lib/useMarketData'

type MarketAviatorProps = {
  account: string | null
  chainId: number | null
}

const MarketAviator: React.FC<MarketAviatorProps> = ({ account, chainId }) => {
  const [multiplier, setMultiplier] = useState<number>(1.0)
  const [isFlying, setIsFlying] = useState<boolean>(false)
  const [crashed, setCrashed] = useState<boolean>(false)
  const [bet, setBet] = useState<string>('0.05')
  const [autoCash, setAutoCash] = useState<string>('')
  const [cashedOut, setCashedOut] = useState<boolean>(false)
  const [balance, setBalance] = useState<number>(1.0)
  const [roundId, setRoundId] = useState<number>(1)
  const [seedCommit, setSeedCommit] = useState<string>('')
  const [seedReveal, setSeedReveal] = useState<string>('')
  const [countdown, setCountdown] = useState<number>(3)
  const [spectators, setSpectators] = useState<number>(128)

  const { priceUsd, emaShort, emaLong, volatility, health } = useMarketData(15000)
  const startTimeRef = useRef<number | null>(null)

  const crashProbability = useCallback(() => {
    if (!startTimeRef.current) return 0.01
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const base = 0.01
    const volFactor = 1 + Math.min(3, volatility * 50)
    const trendDown = emaShort < emaLong ? 1.2 : 1.0
    const multRisk = Math.pow(Math.max(0, multiplier - 1), 2) / 25
    const timeFactor = 1 + elapsed / 60
    return Math.min(0.35, base * volFactor * trendDown * timeFactor + multRisk)
  }, [emaLong, emaShort, multiplier, volatility])

  useEffect(() => {
    if (!isFlying || crashed) return
    const id = setInterval(() => {
      setMultiplier(prev => {
        const inc = 0.006 + (volatility * 0.8) + ((emaShort - emaLong) / Math.max(1, emaLong)) * 0.5
        const jitter = (Math.random() - 0.5) * 0.004
        const next = Math.max(1, prev + inc + jitter)
        if (next > 1.05 && Math.random() < crashProbability()) {
          setCrashed(true)
          setIsFlying(false)
          return +next.toFixed(4)
        }
        if (autoCash && parseFloat(autoCash) > 1 && next >= parseFloat(autoCash)) {
          handleCashout(next)
          return +next.toFixed(4)
        }
        return +next.toFixed(4)
      })
      }, 100)
    return () => clearInterval(id)
  }, [autoCash, crashProbability, crashed, emaLong, emaShort, isFlying, volatility])

  const newSeed = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
  const start = () => {
    setMultiplier(1.0)
    setCrashed(false)
    setCashedOut(false)
    setIsFlying(true)
    startTimeRef.current = Date.now()
    setRoundId(r => r + 1)
    const seed = newSeed()
    setSeedReveal(seed)
    // simple commit = sha-like placeholder
    setSeedCommit(btoa(seed).slice(0, 16) + '…')
  }

  const stop = () => { setIsFlying(false) }

  const penaltyPct = useMemo(() => (multiplier < 1.2 ? 0.01 : 0), [multiplier])
  const handleCashout = (at?: number) => {
    if (!isFlying) return
    const m = at ?? multiplier
    const amount = parseFloat(bet) || 0
    const payout = amount * m * (1 - penaltyPct)
    setBalance(b => b + Math.max(0, payout - amount))
    setIsFlying(false)
    setCashedOut(true)
  }

  // Spectator mode: automatic rounds with countdown if nobody starts
  useEffect(() => {
    if (isFlying) return
    const t = setInterval(() => setCountdown(c => (c <= 1 ? 3 : c - 1)), 1000)
    return () => clearInterval(t)
  }, [isFlying])

  useEffect(() => {
    if (!isFlying && countdown === 1) {
      // if user hasn't started, auto-start spectator round
      start()
    }
  }, [countdown, isFlying])

  // Random spectators join/leave for ambience
  useEffect(() => {
    const t = setInterval(() => setSpectators(s => Math.max(50, s + Math.floor((Math.random() - 0.5) * 10))), 2000)
    return () => clearInterval(t)
  }, [])

  return (
            <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: 12,
      padding: 24
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>Account: {account ? `${account.slice(0, 6)}…${account.slice(-4)}` : 'Not connected'}</div>
        <div>Network: {chainId ?? 'Unknown'}</div>
        <div>Balance: {balance.toFixed(4)} ETH</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>Price: ${priceUsd.toFixed(2)}</div>
        <div>Volatility: {(volatility * 100).toFixed(2)}%</div>
        <div>Health: <span style={{ color: health.healthy ? '#22c55e' : '#f59e0b' }}>{health.source}</span></div>
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>EMA Short: {emaShort.toFixed(2)} • EMA Long: {emaLong.toFixed(2)}</div>
      {/* Plane canvas */}
      <div style={{ position: 'relative', height: 200, marginBottom: 12, borderRadius: 12, border: '1px solid rgba(124,58,237,0.25)', background: 'rgba(2,6,23,0.6)' }}>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* altitude bands */}
          <g opacity="0.35">
            <line x1="0" y1="165" x2="1000" y2="165" stroke="rgba(16,185,129,0.5)" strokeDasharray="6,4" />
            <line x1="0" y1="125" x2="1000" y2="125" stroke="rgba(234,179,8,0.5)" strokeDasharray="6,4" />
            <line x1="0" y1="85" x2="1000" y2="85" stroke="rgba(239,68,68,0.5)" strokeDasharray="6,4" />
          </g>
          {isFlying && !crashed && (
            <path d={`M 60 165 Q ${200 + multiplier * 40} ${185 - multiplier * 30} ${200 + multiplier * 80} ${185 - multiplier * 45}`} fill="none" stroke="rgba(59,130,246,0.8)" strokeWidth="3" />
          )}
        </svg>
        <div style={{ position: 'absolute', left: `${Math.min(85, 10 + (multiplier - 1) * 25)}%`, top: `${Math.max(10, 70 - (multiplier - 1) * 20)}%`, transform: 'translate(-50%, -50%)' }}>
          <span style={{ fontSize: 28 }}>{crashed ? '💥' : '✈️'}</span>
        </div>
        {!isFlying && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd', fontFamily: 'monospace', fontSize: 48, fontWeight: 700 }}>
            {countdown}
          </div>
        )}
        {crashed && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontFamily: 'monospace', fontSize: 28, fontWeight: 700 }}>
            CRASH @{multiplier.toFixed(2)}x
          </div>
        )}
      </div>
      <div style={{
        fontFamily: 'monospace',
        fontSize: 48,
        fontWeight: 700,
        color: crashed ? '#f87171' : cashedOut ? '#fde047' : '#34d399',
        textAlign: 'center',
        marginBottom: 16
      }}>
        {multiplier.toFixed(2)}x {crashed ? '💥' : cashedOut ? '🪂' : '🚀'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Bet Amount (ETH)</div>
          <input value={bet} onChange={e => setBet(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(0,0,0,0.5)', color: '#fff' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Auto Cash‑out (×)</div>
          <input value={autoCash} onChange={e => setAutoCash(e.target.value)} placeholder="e.g. 2.00" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(0,0,0,0.5)', color: '#fff' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Risk</div>
          <div style={{ fontWeight: 700, color: crashProbability() < 0.04 ? '#22c55e' : crashProbability() < 0.08 ? '#f59e0b' : '#ef4444' }}>{(crashProbability() * 100).toFixed(1)}%</div>
        </div>
            </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 12 }}>
        <button onClick={start} disabled={isFlying} style={{ padding: '10px 16px', borderRadius: 8, background: '#7c3aed', color: '#fff', border: 'none' }}>
          Start
        </button>
        {isFlying && !crashed && !cashedOut && (
          <button onClick={() => handleCashout()} style={{ padding: '10px 16px', borderRadius: 8, background: '#f59e0b', color: '#111827', border: 'none' }}>
            Cash‑out {penaltyPct > 0 ? '(1% fee)' : ''}
          </button>
        )}
        <button onClick={stop} disabled={!isFlying} style={{ padding: '10px 16px', borderRadius: 8, background: '#6b7280', color: '#fff', border: 'none' }}>
          Stop
        </button>
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginBottom: 8 }}>
        👥 {spectators.toLocaleString()} watching • Round #{roundId.toString()} • Commit: {seedCommit || '—'} • Reveal: {seedReveal ? seedReveal.slice(0, 8) + '…' : '—'}
      </div>
      {!isFlying && (
        <div style={{ textAlign: 'center', color: '#a78bfa', marginBottom: 8 }}>Next launch in {countdown}s</div>
      )}
      {!health.healthy && <div style={{ fontSize: 12, color: '#f59e0b', textAlign: 'center' }}>Price source degraded ({health.source}); gameplay continues with fallback</div>}
    </div>
  )
}

export default MarketAviator


