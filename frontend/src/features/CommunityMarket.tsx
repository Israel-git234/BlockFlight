import { useEffect, useMemo, useState } from 'react'
import { useNotifications } from '../components/NotificationsProvider'
import { getContract } from '../lib/ethersClient'
import { COMMUNITY_MARKET_ABI } from '../lib/communityAbi'

interface CommunityMarketProps {
  account: string | null
}

interface CommunityBet {
  id: string
  title: string
  description: string
  category: string
  creator: string
  endsAt: Date
  yesOdds: number // payout multiplier for YES
  noOdds: number  // payout multiplier for NO
  totalYes: number
  totalNo: number
  followers: number
  resolved?: 'YES' | 'NO'
  privateGroupId?: string // optional group id for private bets
}

export default function CommunityMarket({ account }: CommunityMarketProps) {
  const { addNotification } = useNotifications()
  const COMMUNITY_ADDR = (import.meta as any).env?.VITE_COMMUNITY_MARKET_CONTRACT as string | undefined
  const [useOnChain, setUseOnChain] = useState<boolean>(!!COMMUNITY_ADDR)
  const [owner, setOwner] = useState<string>('')
  const [onchainMarkets, setOnchainMarkets] = useState<any[]>([])
  const [bets, setBets] = useState<CommunityBet[]>([
    {
      id: 'b1',
      title: 'Will it rain in Johannesburg tomorrow?',
      description: 'Based on SAWS forecasts and current humidity trends.',
      category: 'Weather',
      creator: '0x1a2b...3c4d',
      endsAt: new Date(Date.now() + 36 * 60 * 60 * 1000),
      yesOdds: 1.8,
      noOdds: 2.1,
      totalYes: 1.45,
      totalNo: 0.95,
      followers: 124
    },
    {
      id: 'b2',
      title: 'BTC > $70k by Friday?',
      description: 'Market momentum looks strong; CPI data incoming.',
      category: 'Crypto',
      creator: '0x5e6f...7g8h',
      endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      yesOdds: 2.6,
      noOdds: 1.4,
      totalYes: 3.2,
      totalNo: 5.8,
      followers: 342
    }
  ])

  const [following, setFollowing] = useState<Record<string, boolean>>({})
  const [filter, setFilter] = useState<string>('All')
  const [groupId, setGroupId] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  // Create form
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('General')
  const [durationHours, setDurationHours] = useState(24)
  const [yesOdds, setYesOdds] = useState('2.0')
  const [noOdds, setNoOdds] = useState('2.0')
  const [notifyFollowers, setNotifyFollowers] = useState<boolean>(true)

  // Place bet form (inline)
  const [wager, setWager] = useState('0.05')

  const visibleBets = useMemo(() => {
    if (filter === 'All') return bets
    return bets.filter(b => b.category === filter)
  }, [bets, filter])

  const totalPool = (b: CommunityBet) => b.totalYes + b.totalNo
  const timeLeft = (d: Date) => {
    const ms = d.getTime() - Date.now()
    if (ms <= 0) return 'Ended'
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    return `${h}h ${m}m`
  }

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bf_community_bets')
      if (saved) {
        const parsed = JSON.parse(saved)
        // revive dates
        const revived: CommunityBet[] = parsed.map((b: any) => ({ ...b, endsAt: new Date(b.endsAt) }))
        setBets(revived)
      }
      const savedFollows = localStorage.getItem('bf_community_follows')
      if (savedFollows) setFollowing(JSON.parse(savedFollows))
    } catch {}
  }, [])

  // On-chain sync
  useEffect(() => {
    if (!useOnChain || !COMMUNITY_ADDR) return
    let cancelled = false
    ;(async () => {
      try {
        const c = await getContract(COMMUNITY_ADDR, COMMUNITY_MARKET_ABI, false)
        // owner() exists via Ownable: hardhat artifact ABI not imported here, but Common in OZ
        // We will try-catch owner call; if absent, skip
        try { const own = await (c as any).owner(); if (!cancelled) setOwner(own) } catch {}
        const count = Number(await (c as any).marketCount())
        const ms: any[] = []
        for (let i = 1; i <= count; i++) {
          const m = await (c as any).markets(i)
          ms.push({ id: i, ...m })
        }
        if (!cancelled) setOnchainMarkets(ms)
      } catch (e) { console.warn('on-chain sync failed', e) }
    })()
    return () => { cancelled = true }
  }, [useOnChain, COMMUNITY_ADDR])

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem('bf_community_bets', JSON.stringify(bets)) } catch {}
  }, [bets])
  useEffect(() => {
    try { localStorage.setItem('bf_community_follows', JSON.stringify(following)) } catch {}
  }, [following])

  const createBet = async () => {
    if (!account) {
      alert('Connect wallet to create a bet')
      return
    }
    if (!title.trim() || !description.trim()) {
      alert('Please add a title and description')
      return
    }
    const id = `b${Date.now()}`
    if (useOnChain && COMMUNITY_ADDR) {
      try {
        const contract = await getContract(COMMUNITY_ADDR, COMMUNITY_MARKET_ABI, true)
        const endsAt = Math.floor((Date.now() + durationHours * 3600000) / 1000)
        const yesX100 = Math.floor((parseFloat(yesOdds) || 2.0) * 100)
        const noX100 = Math.floor((parseFloat(noOdds) || 2.0) * 100)
        const tx = await contract.createMarket(
          title.trim(), description.trim(), category, (isPrivate && groupId.trim()) ? groupId.trim() : '',
          endsAt, yesX100, noX100
        )
        const receipt = await tx.wait()
        // After creating, re-sync markets
        try {
          const c = await getContract(COMMUNITY_ADDR, COMMUNITY_MARKET_ABI, false)
          const count = Number(await (c as any).marketCount())
          const m = await (c as any).markets(count)
          setOnchainMarkets(prev => [...prev, { id: count, ...m }])
        } catch {}
      } catch (e) {
        console.error('On-chain create failed, falling back to local', e)
      }
    }
    const newBet: CommunityBet = {
      id,
      title: title.trim(),
      description: description.trim(),
      category,
      creator: account.slice(0, 6) + '...' + account.slice(-4),
      endsAt: new Date(Date.now() + durationHours * 3600000),
      yesOdds: parseFloat(yesOdds) || 2.0,
      noOdds: parseFloat(noOdds) || 2.0,
      totalYes: 0,
      totalNo: 0,
      followers: 0,
      privateGroupId: isPrivate && groupId.trim() ? groupId.trim() : undefined
    }
    setBets(prev => [newBet, ...prev])
    if (notifyFollowers) {
      addNotification({
        title: 'New Community Prediction',
        message: `${newBet.title} • YES ${newBet.yesOdds.toFixed(2)}× / NO ${newBet.noOdds.toFixed(2)}×${newBet.privateGroupId ? ' • Private' : ''}`,
        tag: 'community'
      })
    }
    setTitle('')
    setDescription('')
    setCategory('General')
    setDurationHours(24)
    setYesOdds('2.0')
    setNoOdds('2.0')
  }

  const followCreator = (creator: string) => {
    setFollowing(prev => ({ ...prev, [creator]: !prev[creator] }))
    // Simple follower count update on visible bets by this creator
    setBets(prev => prev.map(b => b.creator === creator ? { ...b, followers: (following[creator] ? Math.max(0, b.followers - 1) : b.followers + 1) } : b))
  }

  const placeBet = (betId: string, side: 'YES' | 'NO') => {
    if (!account) {
      alert('Connect wallet to bet')
      return
    }
    const amount = parseFloat(wager) || 0.01
    if (useOnChain && COMMUNITY_ADDR) {
      // best-effort on-chain bet; UI updates locally regardless
      getContract(COMMUNITY_ADDR, COMMUNITY_MARKET_ABI, true)
        .then(async (c) => {
          // For demo, bet on last market if exists
          const idNum = onchainMarkets.length > 0 ? onchainMarkets[onchainMarkets.length - 1].id : 1
          const value = BigInt(Math.floor(amount * 1e18))
          const tx = await c.bet(idNum, side === 'YES', { value })
          await tx.wait()
        })
        .catch(err => console.warn('On-chain bet failed (demo continues locally):', err))
    }
    setBets(prev => prev.map(b => {
      if (b.id !== betId) return b
      if (side === 'YES') {
        return { ...b, totalYes: b.totalYes + amount }
      } else {
        return { ...b, totalNo: b.totalNo + amount }
      }
    }))
  }

  const styles = {
    container: {
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(20px)',
      borderRadius: '2rem',
      padding: '3rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      maxWidth: '100%',
      margin: '0 auto',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.1)',
      minHeight: 'calc(100vh - 200px)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
      backgroundSize: '400% 400%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center' as const,
      animation: 'gradientShift 3s ease-in-out infinite',
      textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      textAlign: 'center' as const,
      marginBottom: '3rem',
      maxWidth: '700px',
      margin: '0 auto 3rem auto',
      lineHeight: '1.6',
      opacity: 0.9
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 2fr',
      gap: '2rem'
    },
    card: {
      background: 'rgba(0,0,0,0.4)',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      borderRadius: '1.5rem',
      padding: '2rem',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    },
      fontSize: '0.875rem',
      color: '#d1d5db',
      marginTop: '0.75rem',
      display: 'block' as const
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      background: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(124,58,237,0.4)',
      borderRadius: '0.5rem',
      color: 'white',
      marginTop: '0.25rem'
    },
    selectRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem'
    },
    button: {
      background: 'linear-gradient(45deg,#10b981,#059669)',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.75rem 1.25rem',
      color: 'white',
      fontWeight: 'bold',
      marginTop: '0.75rem',
      cursor: 'pointer'
    },
    betRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '0.75rem',
      alignItems: 'center',
      padding: '0.75rem',
      borderBottom: '1px solid rgba(124,58,237,0.2)'
    },
    small: {
      fontSize: '0.75rem',
      color: '#9ca3af'
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧠 Community Market</h2>
      <p style={styles.subtitle}>
        Create custom prediction markets and bet on real-world events with the community
      </p>
      
      <div style={styles.grid}>
      {/* Create Bet */}
      <div style={styles.card}>
        <div style={styles.title}>🧠 Create Custom Prediction</div>
        <label style={styles.label}>Title</label>
        <input style={styles.input} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Will it rain tomorrow in Johannesburg?" />
        <label style={styles.label}>Description / Analysis</label>
        <textarea style={{...styles.input, minHeight: 100 as any}} value={description} onChange={e => setDescription(e.target.value)} placeholder="Why you think this will happen; sources, reasoning, etc." />
        <div style={styles.selectRow}>
          <div>
            <label style={styles.label}>Category</label>
            <select style={styles.input as any} value={category} onChange={e => setCategory(e.target.value)}>
              {['General','Weather','Crypto','Sports','Politics','Tech'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={styles.label}>Ends In (hours)</label>
            <input style={styles.input} type="number" min={1} max={24*14} value={durationHours} onChange={e => setDurationHours(parseInt(e.target.value||'24'))} />
          </div>
        </div>
        <div style={styles.selectRow}>
          <div>
            <label style={styles.label}>Private Group ID (optional)</label>
            <input style={styles.input} placeholder="e.g. friends-123" value={groupId} onChange={e => setGroupId(e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Private Bet?</label>
            <select style={styles.input as any} value={isPrivate? 'yes' : 'no'} onChange={e => setIsPrivate(e.target.value==='yes')}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
        <div style={styles.selectRow}>
          <div>
            <label style={styles.label}>YES Odds (×)</label>
            <input style={styles.input} value={yesOdds} onChange={e => setYesOdds(e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>NO Odds (×)</label>
            <input style={styles.input} value={noOdds} onChange={e => setNoOdds(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button style={styles.button} onClick={createBet}>
          Create Prediction
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa' }}>
            <input type="checkbox" checked={notifyFollowers} onChange={e => setNotifyFollowers(e.target.checked)} />
            Notify followers
          </label>
        </div>
        {!account && <div style={styles.small}>Connect wallet to publish your prediction.</div>}
      </div>

      {/* Browse Bets */}
      <div style={styles.card}>
        <div style={styles.title}>📚 Community Predictions</div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {['All','Weather','Crypto','Sports','Politics','Tech','General'].map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{...styles.button, background: filter===c?'linear-gradient(45deg,#f59e0b,#a855f7)':'rgba(124,58,237,0.2)'}}>
              {c}
            </button>
          ))}
        </div>

        <div>
          <div style={{...styles.betRow, fontWeight: 'bold'}}>
            <div>Prediction</div>
            <div>Pool</div>
            <div>Odds</div>
            <div>Actions</div>
          </div>
          {visibleBets
            .filter(b => !b.privateGroupId || (groupId && b.privateGroupId === groupId))
            .map(b => (
            <div key={b.id} style={styles.betRow}>
              <div>
                <div style={{fontWeight:'bold'}}>{b.title}</div>
                <div style={styles.small}>{b.description}</div>
                <div style={styles.small}>By {b.creator} • Ends in {timeLeft(b.endsAt)}{b.privateGroupId? ` • Private(${b.privateGroupId})` : ''}</div>
              </div>
              <div>
                <div>{totalPool(b).toFixed(2)} ETH</div>
                <div style={styles.small}>YES {b.totalYes.toFixed(2)} • NO {b.totalNo.toFixed(2)}</div>
              </div>
              <div>
                <div>YES {b.yesOdds.toFixed(2)}×</div>
                <div>NO {b.noOdds.toFixed(2)}×</div>
              </div>
              <div>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <input style={{...styles.input, width: 100}} value={wager} onChange={e=>setWager(e.target.value)} />
                  <button style={styles.button} onClick={() => placeBet(b.id, 'YES')}>Bet YES</button>
                  <button style={{...styles.button, background:'linear-gradient(45deg,#ef4444,#b91c1c)'}} onClick={() => placeBet(b.id, 'NO')}>Bet NO</button>
                </div>
                <div style={{display:'flex', gap:'0.5rem', marginTop:'0.5rem'}}>
                  <button style={{...styles.button, background: following[b.creator]?'linear-gradient(45deg,#10b981,#059669)':'rgba(124,58,237,0.2)'}} onClick={() => followCreator(b.creator)}>
                    {following[b.creator]? 'Following' : 'Follow Creator'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Admin resolve / user claim controls */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
          <button
            style={{background: 'linear-gradient(45deg,#a855f7,#ec4899)', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}
            onClick={async () => {
              if (useOnChain && COMMUNITY_ADDR) {
                try {
                  const c = await getContract(COMMUNITY_ADDR, COMMUNITY_MARKET_ABI, true)
                  const idNum = onchainMarkets.length > 0 ? onchainMarkets[onchainMarkets.length - 1].id : 1
                  const tx = await (c as any).resolve(idNum, true)
                  await tx.wait()
                  addNotification({ title: 'Market Resolved', message: `Market #${idNum} resolved to YES`, tag: 'community' })
                } catch (e) { alert('Resolve failed: ' + (e as any)?.message) }
              } else {
                alert('Local demo: resolution not persisted on-chain')
              }
            }}
          >Resolve YES (admin)</button>
          <button
            style={{background: 'linear-gradient(45deg,#ef4444,#b91c1c)', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}
            onClick={async () => {
              if (useOnChain && COMMUNITY_ADDR) {
                try {
                  const c = await getContract(COMMUNITY_ADDR, COMMUNITY_MARKET_ABI, true)
                  const idNum = onchainMarkets.length > 0 ? onchainMarkets[onchainMarkets.length - 1].id : 1
                  const tx = await (c as any).resolve(idNum, false)
                  await tx.wait()
                  addNotification({ title: 'Market Resolved', message: `Market #${idNum} resolved to NO`, tag: 'community' })
                } catch (e) { alert('Resolve failed: ' + (e as any)?.message) }
              } else {
                alert('Local demo: resolution not persisted on-chain')
              }
            }}
          >Resolve NO (admin)</button>
          <button
            style={{background: 'linear-gradient(45deg,#10b981,#059669)', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}
            onClick={async () => {
              if (useOnChain && COMMUNITY_ADDR) {
                try {
                  const c = await getContract(COMMUNITY_ADDR, COMMUNITY_MARKET_ABI, true)
                  const idNum = onchainMarkets.length > 0 ? onchainMarkets[onchainMarkets.length - 1].id : 1
                  const tx = await (c as any).claim(idNum)
                  await tx.wait()
                  addNotification({ title: 'Claimed', message: `Claimed payout from market #${idNum}`, tag: 'community' })
                } catch (e) { alert('Claim failed: ' + (e as any)?.message) }
              } else {
                alert('Local demo: no claims processed')
              }
            }}
          >Claim Payout</button>
        </div>
        {useOnChain && COMMUNITY_ADDR && (
          <div style={{ marginTop: '1rem', color: '#9ca3af', fontSize: '0.875rem' }}>
            Synced {onchainMarkets.length} on-chain markets {owner ? `(owner: ${owner.slice(0,6)}...${owner.slice(-4)})` : ''}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
