import React, { useState, useEffect } from 'react'

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
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const styles = {
    container: {
      marginBottom: '4rem',
      position: 'relative' as const
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
      backgroundSize: '400% 400%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradientShift 4s ease-in-out infinite',
      textShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
      filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))'
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative' as const
    },
    card: {
      padding: '2rem',
      borderRadius: '2rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(20px)',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
      transform: 'translateY(0) scale(1)',
      opacity: 1
    },
    selected: {
      border: '2px solid rgba(0, 255, 255, 0.8)',
      boxShadow: '0 0 40px rgba(0, 255, 255, 0.4), 0 25px 50px rgba(0, 0, 0, 0.5)',
      transform: 'translateY(-8px) scale(1.03)',
      background: 'rgba(0, 255, 255, 0.05)'
    },
    hovered: {
      border: '2px solid rgba(0, 255, 255, 0.6)',
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)',
      transform: 'translateY(-5px) scale(1.02)',
      background: 'rgba(0, 255, 255, 0.03)'
    },
    cardGlow: {
      position: 'absolute' as const,
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
      borderRadius: '2rem',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: -1
    },
    cardGlowActive: {
      opacity: 0.3
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      position: 'relative' as const
    },
    icon: {
      fontSize: '3rem',
      filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.6))',
      transition: 'all 0.3s ease',
      animation: 'iconFloat 3s ease-in-out infinite'
    },
    iconHovered: {
      transform: 'scale(1.2) rotate(10deg)',
      filter: 'drop-shadow(0 0 25px rgba(0, 255, 255, 0.8))'
    },
    name: {
      fontWeight: 'bold' as const,
      fontSize: '1.5rem',
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      transition: 'all 0.3s ease'
    },
    description: {
      color: '#d1d5db',
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      opacity: 0.9
    },
    status: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      borderRadius: '1.5rem',
      fontSize: '0.875rem',
      fontWeight: 'bold' as const,
      background: 'linear-gradient(45deg, #00ff88, #00d4aa)',
      color: 'white',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
      boxShadow: '0 6px 20px rgba(0, 255, 136, 0.4)',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    soon: {
      background: 'linear-gradient(45deg, #f59e0b, #d97706)',
      boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)'
    },
    statusShimmer: {
      position: 'absolute' as const,
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      animation: 'shimmer 2s ease-in-out infinite'
    },
    animatedBorder: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '2rem',
      padding: '2px',
      background: 'linear-gradient(45deg, #00ffff, #8b5cf6, #00ff88, #00ffff)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 3s ease-in-out infinite',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: -1
    },
    animatedBorderActive: {
      opacity: 0.6
    },
    particleContainer: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none' as const,
      overflow: 'hidden' as const,
      borderRadius: '2rem'
    },
    particle: {
      position: 'absolute' as const,
      width: '4px',
      height: '4px',
      background: '#00ffff',
      borderRadius: '50%',
      animation: 'particleFloat 4s ease-in-out infinite',
      boxShadow: '0 0 10px #00ffff'
    }
  }

  const getCardStyle = (featureId: string) => {
    const isSelected = selectedFeature === featureId
    const isHovered = hoveredFeature === featureId
    
    return {
      ...styles.card,
      ...(isSelected ? styles.selected : {}),
      ...(isHovered && !isSelected ? styles.hovered : {}),
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded 
        ? (isSelected ? 'translateY(-8px) scale(1.03)' : isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)')
        : 'translateY(20px) scale(0.95)'
    }
  }

  const getIconStyle = (featureId: string) => {
    const isHovered = hoveredFeature === featureId
    return {
      ...styles.icon,
      ...(isHovered ? styles.iconHovered : {})
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Choose Your Game Mode</h2>
      <p style={styles.subtitle}>
        Experience the future of decentralized gaming with market-driven mechanics and cutting-edge technology
      </p>
      
      <div style={styles.grid}>
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="feature-card"
            onClick={() => onSelectFeature(feature.id)}
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
            style={{
              ...getCardStyle(feature.id),
              transitionDelay: `${index * 0.1}s`
            }}
          >
            {/* Animated Border */}
            <div style={{
              ...styles.animatedBorder,
              ...(selectedFeature === feature.id ? styles.animatedBorderActive : {})
            }} />

            {/* Card Glow Effect */}
            <div style={{
              ...styles.cardGlow,
              ...(selectedFeature === feature.id ? styles.cardGlowActive : {})
            }} />

            {/* Particle Effects */}
            {selectedFeature === feature.id && (
              <div style={styles.particleContainer}>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.particle,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}

            <div style={styles.header}>
              <div style={getIconStyle(feature.id)}>{feature.icon}</div>
              <div style={styles.name}>{feature.name}</div>
            </div>
            
            <div style={styles.description}>{feature.description}</div>
            
            <div style={{
              ...styles.status,
              ...(feature.status === 'Coming Soon' ? styles.soon : {})
            }}>
              <div style={styles.statusShimmer}></div>
              {feature.status}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            opacity: 0; 
            transform: translateY(0px) scale(0.5); 
          }
          50% { 
            opacity: 1; 
            transform: translateY(-20px) scale(1.2); 
          }
        }

        .feature-card:hover {
          transform: translateY(-8px) scale(1.03) !important;
        }

        .feature-card:hover .icon {
          transform: scale(1.2) rotate(10deg) !important;
          filter: drop-shadow(0 0 25px rgba(0, 255, 255, 0.8)) !important;
        }

        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #00ffff, #8b5cf6);
          border-radius: 6px;
          border: 2px solid rgba(0, 0, 0, 0.3);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #22d3ee, #a855f7);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </div>
  )
}


