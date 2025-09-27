interface NFTRewardsProps {
  account: string | null
  chainId: number | null
}

export default function NFTRewards({ account, chainId }: NFTRewardsProps) {
  const styles = {
    container: {
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1.5rem',
      padding: '3rem',
      textAlign: 'center' as const,
      border: '1px solid rgba(168, 85, 247, 0.3)'
    },
    icon: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #a855f7, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    description: {
      fontSize: '1.125rem',
      color: '#d1d5db',
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem auto'
    },
    comingSoon: {
      background: 'linear-gradient(45deg, #a855f7, #ec4899)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '1rem',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'default'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.icon}>🏆</div>
      <h2 style={styles.title}>NFT Rewards</h2>
      <p style={styles.description}>
        Earn unique, evolving NFTs for achieving high multipliers and big wins. 
        Collect rare pilot badges, plane designs, and exclusive rewards that showcase your BlockFlight achievements.
      </p>
      <div style={styles.comingSoon}>Coming Soon</div>
    </div>
  )
}

