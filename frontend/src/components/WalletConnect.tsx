import { useState } from 'react'

interface WalletConnectProps {
  account: string | null
  setAccount: (account: string | null) => void
}

export default function WalletConnect({ account, setAccount }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use BlockFlight!')
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      setAccount(accounts[0])
      
      // Switch to BlockDAG network if needed
      await switchToBlockDAG()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const switchToBlockDAG = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x413' }], // 1043 in hex
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x413',
              chainName: 'BlockDAG Testnet',
              nativeCurrency: {
                name: 'BlockDAG',
                symbol: 'BDAG',
                decimals: 18,
              },
              rpcUrls: ['https://rpc.blockdag.network'],
              blockExplorerUrls: ['https://explorer.blockdag.network'],
            }],
          })
        } catch (addError) {
          console.error('Failed to add BlockDAG network:', addError)
        }
      }
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const styles = {
    connectButton: {
      background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
      border: 'none',
      borderRadius: '0.75rem',
      padding: '0.75rem 1.5rem',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    connectedContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '0.75rem',
      padding: '0.5rem 1rem',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    addressDisplay: {
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      color: '#3b82f6',
      fontWeight: 'bold'
    },
    disconnectButton: {
      background: 'rgba(239, 68, 68, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '0.5rem',
      padding: '0.25rem 0.75rem',
      color: '#ef4444',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease'
    },
    walletIcon: {
      fontSize: '1.25rem'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#10b981',
      animation: 'pulse 2s infinite'
    }
  }

  if (account) {
    return (
      <div style={styles.connectedContainer}>
        <div style={styles.statusDot}></div>
        <div style={styles.walletIcon}>👛</div>
        <div style={styles.addressDisplay}>
          {shortenAddress(account)}
        </div>
        <button 
          onClick={disconnectWallet}
          style={styles.disconnectButton}
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={connectWallet}
      disabled={isConnecting}
      style={{
        ...styles.connectButton,
        opacity: isConnecting ? 0.7 : 1,
        cursor: isConnecting ? 'not-allowed' : 'pointer'
      }}
    >
      <div style={styles.walletIcon}>👛</div>
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}

