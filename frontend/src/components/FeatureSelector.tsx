import React from 'react'

interface Feature {
  id: string
  name: string
  description: string
  icon: string
  status: 'Live' | 'Coming Soon'
  color: string // gradient tail e.g. from-red-500 to-orange-500
}

interface FeatureSelectorProps {
  features: Feature[]
  selectedFeature: string
  onSelectFeature: (id: string) => void
}

export default function FeatureSelector({ features, selectedFeature, onSelectFeature }: FeatureSelectorProps) {
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
      gap: '1rem'
    },
    card: {
      padding: '1rem',
      borderRadius: '1rem',
      border: '1px solid rgba(124,58,237,0.3)',
      background: 'rgba(0,0,0,0.35)',
      cursor: 'pointer'
    },
    selected: {
      border: '1px solid rgba(59,130,246,0.8)',
      boxShadow: '0 0 30px rgba(59,130,246,0.25)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.25rem'
    },
    icon: {
      fontSize: '1.5rem'
    },
    name: {
      fontWeight: 'bold' as const,
      fontSize: '1.125rem',
      background: 'linear-gradient(45deg,#7c3aed,#ec4899,#3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    description: {
      color: '#d1d5db',
      fontSize: '0.875rem'
    },
    status: {
      marginTop: '0.5rem',
      display: 'inline-block',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.5rem',
      fontSize: '0.75rem',
      fontWeight: 'bold' as const,
      background: 'rgba(16,185,129,0.15)',
      border: '1px solid rgba(16,185,129,0.3)',
      color: '#10b981'
    },
    soon: {
      background: 'rgba(234,179,8,0.15)',
      border: '1px solid rgba(234,179,8,0.3)',
      color: '#f59e0b'
    }
  }

  return (
    <div style={styles.grid}>
      {features.map((f) => (
        <div
          key={f.id}
          className="feature-card"
          onClick={() => onSelectFeature(f.id)}
          style={{
            ...styles.card,
            ...(selectedFeature === f.id ? styles.selected : {}),
          }}
        >
          <div style={styles.header}>
            <div style={styles.icon}>{f.icon}</div>
            <div style={styles.name}>{f.name}</div>
          </div>
          <div style={styles.description}>{f.description}</div>
          <div style={{
            ...styles.status,
            ...(f.status === 'Coming Soon' ? styles.soon : {})
          }}>
            {f.status}
          </div>
        </div>
      ))}
    </div>
  )
}


