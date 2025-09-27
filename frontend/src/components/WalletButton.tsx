import React, { useState } from 'react';
import { Button } from './ui/button';
import { Wallet, CheckCircle, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);

    // Simulate MetaMask connection
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  if (isConnected) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="relative group"
      >
        <Button
          onClick={handleDisconnect}
          className="bg-gray-800/80 border-2 border-green-500/50 hover:border-green-400 text-white shadow-lg backdrop-blur-sm relative overflow-hidden cyber-button"
        >
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />

          <div className="flex items-center space-x-2 relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-4 h-4 text-green-400" />
            </motion.div>
            <span className="hidden sm:inline font-mono">0x1234...5678</span>
            <span className="sm:hidden">SECURE</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          </div>
        </Button>

        {/* Holographic glow */}
        <motion.div
          className="absolute inset-0 bg-green-500/20 rounded-md blur-xl"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="relative group"
    >
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-gray-800/80 border-2 border-cyan-500/50 hover:border-cyan-400 text-white shadow-lg backdrop-blur-sm relative overflow-hidden cyber-button"
      >
        {/* Animated circuit pattern */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '20px 20px']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(0, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(0, 255, 255, 0.1) 25%, transparent 25%)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        <AnimatePresence mode="wait">
          {isConnecting ? (
            <motion.div
              key="connecting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex items-center space-x-2 relative z-10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
              />
              <span className="font-mono">CONNECTING...</span>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="flex space-x-1"
              >
                <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                <div className="w-1 h-1 bg-cyan-400 rounded-full" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="connect"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex items-center space-x-2 relative z-10"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Wallet className="w-4 h-4 text-cyan-400" />
              </motion.div>
              <span className="hidden sm:inline font-medium">Connect MetaMask</span>
              <span className="sm:hidden font-medium">CONNECT</span>
              <Zap className="w-3 h-3 text-yellow-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Cyberpunk glow effect */}
      <motion.div
        className="absolute inset-0 bg-cyan-500/20 rounded-md blur-xl"
        animate={{
          opacity: isConnecting ? [0.2, 0.8, 0.2] : [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: isConnecting ? 1 : 3,
          repeat: Infinity
        }}
      />
    </motion.div>
  );
}

export default WalletButton;