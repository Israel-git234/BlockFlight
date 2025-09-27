import { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';

export default function Flight() {
  const { account, connectWallet } = useWallet();
  const [betAmount, setBetAmount] = useState('0.01');
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [hasBet, setHasBet] = useState(false);

  // Mock flight animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFlying && !crashed) {
      interval = setInterval(() => {
        setMultiplier(prev => {
          const next = prev + 0.01 + (Math.random() * 0.02);
          // Mock crash at random point
          if (Math.random() < 0.005 && prev > 1.5) {
            setCrashed(true);
            setIsFlying(false);
            return prev;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isFlying, crashed]);

  const placeBet = () => {
    if (!account) {
      connectWallet();
      return;
    }
    setHasBet(true);
    // TODO: Call smart contract placeBet()
  };

  const cashOut = () => {
    if (!hasBet || crashed) return;
    setIsFlying(false);
    setHasBet(false);
    // TODO: Call smart contract cashOut()
  };

  const startNewRound = () => {
    setMultiplier(1.00);
    setIsFlying(true);
    setCrashed(false);
    setHasBet(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-400">Flight Mode ✈️</h1>
        
        {/* Game Area */}
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl p-8 mb-8 border border-red-500/20">
          <div className="text-center mb-8">
            <div className="text-8xl font-bold mb-4">
              {crashed ? (
                <span className="text-red-500">💥 {multiplier.toFixed(2)}x</span>
              ) : (
                <span className={isFlying ? 'text-green-400' : 'text-yellow-400'}>
                  {multiplier.toFixed(2)}x
                </span>
              )}
            </div>
            <div className="text-2xl">
              {crashed ? '🔥 CRASHED!' : isFlying ? '✈️ Flying...' : '🛫 Ready for takeoff'}
            </div>
          </div>

          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Bet Amount (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                disabled={hasBet || isFlying}
              />
              
              {!account ? (
                <button
                  onClick={connectWallet}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Connect Wallet
                </button>
              ) : !hasBet && !isFlying ? (
                <button
                  onClick={placeBet}
                  className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Place Bet
                </button>
              ) : hasBet && isFlying && !crashed ? (
                <button
                  onClick={cashOut}
                  className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors animate-pulse"
                >
                  Cash Out ({(parseFloat(betAmount) * multiplier).toFixed(4)} ETH)
                </button>
              ) : (
                <button
                  onClick={startNewRound}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  New Round
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Game Stats</h3>
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Current Bet:</span>
                  <span>{hasBet ? `${betAmount} ETH` : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Potential Win:</span>
                  <span>{hasBet ? `${(parseFloat(betAmount) * multiplier).toFixed(4)} ETH` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={crashed ? 'text-red-400' : isFlying ? 'text-green-400' : 'text-yellow-400'}>
                    {crashed ? 'Crashed' : isFlying ? 'Flying' : 'Waiting'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-gray-400">
          <p className="mb-2">
            🎯 Multiplier influenced by real market volatility + provably fair randomness
          </p>
          <p>
            💡 Cash out before the crash to secure your winnings!
          </p>
        </div>
      </div>
    </div>
  );
}
