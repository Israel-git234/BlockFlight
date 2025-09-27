import React, { useState, useEffect } from 'react'

interface LeaderboardEntry {
  rank: number
  address: string
  totalWins: number
  biggestWin: number
  winRate: number
  totalVolume: number
  avatar: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      address: '0x1234...5678',
      totalWins: 47,
      biggestWin: 12.5,
      winRate: 78.5,
      totalVolume: 156.8,
      avatar: '🏆'
    },
    {
      rank: 2,
      address: '0x2345...6789',
      totalWins: 42,
      biggestWin: 9.8,
      winRate: 72.1,
      totalVolume: 134.2,
      avatar: '🥈'
    },
    {
      rank: 3,
      address: '0x3456...7890',
      totalWins: 38,
      biggestWin: 8.2,
      winRate: 69.3,
      totalVolume: 118.7,
      avatar: '🥉'
    },
    {
      rank: 4,
      address: '0x4567...8901',
      totalWins: 35,
      biggestWin: 7.1,
      winRate: 65.8,
      totalVolume: 98.4,
      avatar: '💎'
    },
    {
      rank: 5,
      address: '0x5678...9012',
      totalWins: 32,
      biggestWin: 6.9,
      winRate: 62.4,
      totalVolume: 87.3,
      avatar: '⭐'
    }
  ])

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-win',
      name: 'First Flight',
      description: 'Win your first game',
      icon: '🎯',
      unlocked: true,
      rarity: 'common'
    },
    {
      id: 'big-win',
      name: 'High Flyer',
      description: 'Cash out at 5x or higher',
      icon: '🚀',
      unlocked: true,
      rarity: 'rare'
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      description: 'Win 10 games in a row',
      icon: '🔥',
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 'whale-hunter',
      name: 'Whale Hunter',
      description: 'Win 50+ ETH in a single game',
      icon: '🐋',
      unlocked: false,
      rarity: 'legendary'
    },
    {
      id: 'market-master',
      name: 'Market Master',
      description: 'Win 100 games total',
      icon: '👑',
      unlocked: false,
      rarity: 'legendary'
    }
  ])

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
      fontSize: '1.125rem',
      color: '#d1d5db',
      textAlign: 'center' as const,
      marginBottom: '3rem'
    },
    tabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      justifyContent: 'center' as const
    },
    tab: {
      padding: '0.75rem 1.5rem',
      borderRadius: '1rem',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      background: 'rgba(0, 0, 0, 0.3)',
      color: '#d1d5db',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 'bold' as const
    },
    activeTab: {
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0, 255, 255, 0.3)'
    },
    leaderboardTable: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginBottom: '2rem'
    },
    tableHeader: {
      background: 'rgba(0, 255, 255, 0.1)',
      padding: '1rem',
      textAlign: 'left' as const,
      fontWeight: 'bold' as const,
      color: '#00ffff',
      borderBottom: '2px solid rgba(0, 255, 255, 0.3)'
    },
    tableRow: {
      borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
      transition: 'all 0.3s ease'
    },
    tableCell: {
      padding: '1rem',
      color: '#d1d5db'
    },
    rankCell: {
      fontWeight: 'bold' as const,
      fontSize: '1.25rem',
      color: '#00ffff'
    },
    avatarCell: {
      fontSize: '1.5rem',
      textAlign: 'center' as const
    },
    addressCell: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.875rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(0, 255, 255, 0.2)',
      textAlign: 'center' as const
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#00ffff',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#d1d5db',
      fontSize: '0.875rem'
    },
    achievementsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem'
    },
    achievementCard: {
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      textAlign: 'center' as const,
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    unlockedAchievement: {
      border: '2px solid rgba(0, 255, 136, 0.6)',
      boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
    },
    achievementIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
    },
    achievementName: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#00ffff'
    },
    achievementDescription: {
      color: '#d1d5db',
      fontSize: '0.875rem',
      marginBottom: '1rem'
    },
    rarityBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      textTransform: 'uppercase' as const
    },
    common: {
      background: 'linear-gradient(45deg, #6b7280, #9ca3af)',
      color: 'white'
    },
    rare: {
      background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
      color: 'white'
    },
    epic: {
      background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
      color: 'white'
    },
    legendary: {
      background: 'linear-gradient(45deg, #f59e0b, #d97706)',
      color: 'white'
    }
  }

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements'>('leaderboard')

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Leaderboard & Achievements</h2>
      <p style={styles.subtitle}>
        Compete with the best players and unlock exclusive achievements
      </p>

      {/* Tabs */}
      <div style={styles.tabs}>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === 'leaderboard' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('leaderboard')}
        >
          🏆 Leaderboard
        </div>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === 'achievements' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('achievements')}
        >
          🎯 Achievements
        </div>
      </div>

      {activeTab === 'leaderboard' && (
        <>
          {/* Stats Overview */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>1,247</div>
              <div style={styles.statLabel}>Total Players</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>45.2 ETH</div>
              <div style={styles.statLabel}>Total Volume</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>12.5x</div>
              <div style={styles.statLabel}>Biggest Win</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>78.5%</div>
              <div style={styles.statLabel}>Top Win Rate</div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <table style={styles.leaderboardTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Rank</th>
                <th style={styles.tableHeader}>Player</th>
                <th style={styles.tableHeader}>Wins</th>
                <th style={styles.tableHeader}>Biggest Win</th>
                <th style={styles.tableHeader}>Win Rate</th>
                <th style={styles.tableHeader}>Volume</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  style={styles.tableRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 255, 0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <td style={{...styles.tableCell, ...styles.rankCell}}>
                    #{entry.rank}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <span style={styles.avatarCell}>{entry.avatar}</span>
                      <span style={styles.addressCell}>{entry.address}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{entry.totalWins}</td>
                  <td style={styles.tableCell}>{entry.biggestWin.toFixed(1)} ETH</td>
                  <td style={styles.tableCell}>{entry.winRate.toFixed(1)}%</td>
                  <td style={styles.tableCell}>{entry.totalVolume.toFixed(1)} ETH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === 'achievements' && (
        <div style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              style={{
                ...styles.achievementCard,
                ...(achievement.unlocked ? styles.unlockedAchievement : {}),
                opacity: achievement.unlocked ? 1 : 0.6
              }}
            >
              <div style={styles.achievementIcon}>{achievement.icon}</div>
              <div style={styles.achievementName}>{achievement.name}</div>
              <div style={styles.achievementDescription}>{achievement.description}</div>
              <div style={{
                ...styles.rarityBadge,
                ...styles[achievement.rarity]
              }}>
                {achievement.rarity}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
