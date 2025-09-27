export default function Leaderboard() {
  // Mock leaderboard data
  const flightLeaders = [
    { rank: 1, address: '0x1234...5678', wins: 42, highestMultiplier: 15.67, totalWon: 12.45 },
    { rank: 2, address: '0x2345...6789', wins: 38, highestMultiplier: 12.34, totalWon: 9.87 },
    { rank: 3, address: '0x3456...7890', wins: 35, highestMultiplier: 11.22, totalWon: 8.65 },
    { rank: 4, address: '0x4567...8901', wins: 32, highestMultiplier: 10.55, totalWon: 7.43 },
    { rank: 5, address: '0x5678...9012', wins: 28, highestMultiplier: 9.88, totalWon: 6.21 },
  ];

  const cruiseLeaders = [
    { rank: 1, address: '0x6789...0123', stakes: 15, avgReturn: 18.5, totalStaked: 25.67 },
    { rank: 2, address: '0x7890...1234', stakes: 12, avgReturn: 16.2, totalStaked: 22.34 },
    { rank: 3, address: '0x8901...2345', stakes: 10, avgReturn: 15.8, totalStaked: 19.87 },
    { rank: 4, address: '0x9012...3456', stakes: 9, avgReturn: 14.6, totalStaked: 17.65 },
    { rank: 5, address: '0x0123...4567', stakes: 8, avgReturn: 13.9, totalStaked: 15.43 },
  ];

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">Leaderboard 🏆</h1>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Flight Mode Leaderboard */}
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl p-6 border border-red-500/20">
            <h2 className="text-2xl font-bold mb-6 text-red-400 flex items-center">
              <span className="mr-2">✈️</span>
              Flight Mode Champions
            </h2>
            
            <div className="space-y-3">
              {flightLeaders.map((leader) => (
                <div key={leader.rank} className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl w-8 text-center">
                      {getRankEmoji(leader.rank)}
                    </div>
                    <div>
                      <div className="font-mono text-sm text-gray-300">{leader.address}</div>
                      <div className="text-xs text-gray-400">{leader.wins} wins</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-semibold">{leader.highestMultiplier}x</div>
                    <div className="text-sm text-green-400">{leader.totalWon} ETH</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-red-400">156</div>
                  <div className="text-xs text-gray-400">Total Rounds</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-400">23.45x</div>
                  <div className="text-xs text-gray-400">Highest Ever</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400">89.2 ETH</div>
                  <div className="text-xs text-gray-400">Total Paid Out</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cruise Mode Leaderboard */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
              <span className="mr-2">🚢</span>
              Cruise Mode Navigators
            </h2>
            
            <div className="space-y-3">
              {cruiseLeaders.map((leader) => (
                <div key={leader.rank} className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl w-8 text-center">
                      {getRankEmoji(leader.rank)}
                    </div>
                    <div>
                      <div className="font-mono text-sm text-gray-300">{leader.address}</div>
                      <div className="text-xs text-gray-400">{leader.stakes} stakes</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{leader.avgReturn}%</div>
                    <div className="text-sm text-blue-400">{leader.totalStaked} ETH</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-400">67</div>
                  <div className="text-xs text-gray-400">Active Stakes</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400">24.7%</div>
                  <div className="text-xs text-gray-400">Best Return</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-cyan-400">145.8 ETH</div>
                  <div className="text-xs text-gray-400">Total Staked</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Recent Big Wins 🎉</h2>
            
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">✈️</div>
                  <div>
                    <div className="font-mono text-sm text-gray-300">0x1234...5678</div>
                    <div className="text-xs text-gray-400">2 minutes ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">15.67x multiplier</div>
                  <div className="text-green-400">+2.35 ETH</div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🚢</div>
                  <div>
                    <div className="font-mono text-sm text-gray-300">0x6789...0123</div>
                    <div className="text-xs text-gray-400">1 hour ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">+18.5% return</div>
                  <div className="text-blue-400">Unstaked 5.93 ETH</div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">✈️</div>
                  <div>
                    <div className="font-mono text-sm text-gray-300">0x2345...6789</div>
                    <div className="text-xs text-gray-400">3 hours ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">12.34x multiplier</div>
                  <div className="text-green-400">+1.85 ETH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
