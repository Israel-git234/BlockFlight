import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';

export default function Cruise() {
  const { account, connectWallet } = useWallet();
  const [stakeAmount, setStakeAmount] = useState('0.1');
  const [lockDays, setLockDays] = useState(1);
  const [hasStake, setHasStake] = useState(false);
  const [trendMultiplier] = useState(1.15); // Mock trend

  const stake = () => {
    if (!account) {
      connectWallet();
      return;
    }
    setHasStake(true);
    // TODO: Call smart contract stake()
  };

  const unstake = () => {
    setHasStake(false);
    // TODO: Call smart contract unstake()
  };

  const projectedReturn = parseFloat(stakeAmount) * trendMultiplier;
  const dailyReturn = ((trendMultiplier - 1) / lockDays) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">Cruise Mode 🚢</h1>
        
        {/* Staking Interface */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Stake Form */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold mb-6 text-blue-300">Stake Tokens</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stake Amount (ETH)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  disabled={hasStake}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lock Period: {lockDays} day{lockDays > 1 ? 's' : ''}
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={lockDays}
                  onChange={(e) => setLockDays(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  disabled={hasStake}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 day</span>
                  <span>7 days</span>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Current Trend:</span>
                  <span className="text-green-400">+{((trendMultiplier - 1) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Daily Return:</span>
                  <span className="text-blue-400">~{dailyReturn.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Projected Return:</span>
                  <span className="text-green-400">{projectedReturn.toFixed(4)} ETH</span>
                </div>
              </div>

              {!account ? (
                <button
                  onClick={connectWallet}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Connect Wallet
                </button>
              ) : !hasStake ? (
                <button
                  onClick={stake}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Stake Tokens
                </button>
              ) : (
                <button
                  onClick={unstake}
                  className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Unstake & Claim
                </button>
              )}
            </div>
          </div>

          {/* Portfolio */}
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">Your Portfolio</h2>
            
            {hasStake ? (
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Active Stake</div>
                  <div className="text-2xl font-bold text-blue-400">{stakeAmount} ETH</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Lock Remaining</div>
                  <div className="text-xl font-semibold text-yellow-400">{lockDays} days</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Current Value</div>
                  <div className="text-2xl font-bold text-green-400">
                    {(parseFloat(stakeAmount) * trendMultiplier).toFixed(4)} ETH
                  </div>
                  <div className="text-sm text-green-300">
                    +{(projectedReturn - parseFloat(stakeAmount)).toFixed(4)} ETH profit
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-500/30">
                  <div className="text-sm text-gray-300 mb-2">Market Trend Indicator</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">📈</div>
                    <div>
                      <div className="text-green-400 font-semibold">Bullish Trend</div>
                      <div className="text-sm text-gray-400">Market volatility favoring gains</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏖️</div>
                <div className="text-xl text-gray-400 mb-2">No active stakes</div>
                <div className="text-gray-500">Start your cruise to earn from market trends</div>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-2">
            📊 Returns based on real market trend analysis and volatility
          </p>
          <p>
            ⏰ Longer lock periods = Higher potential multipliers
          </p>
        </div>
      </div>
    </div>
  );
}
