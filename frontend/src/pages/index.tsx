import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Aviator 2.0
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Market-Driven On-Chain Prediction Game
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Experience the thrill of crash prediction with real market volatility. 
            Two modes: quick Flight rounds or strategic Cruise staking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Flight Mode Card */}
          <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl p-8 border border-red-500/20">
            <div className="text-4xl mb-4">✈️</div>
            <h2 className="text-2xl font-bold mb-4 text-red-400">Flight Mode</h2>
            <p className="text-gray-300 mb-6">
              Classic crash game with market-influenced multipliers. 
              Bet, watch the plane climb, and cash out before it crashes!
            </p>
            <ul className="text-sm text-gray-400 mb-6 space-y-2">
              <li>• Real-time multiplier growth</li>
              <li>• Market volatility integration</li>
              <li>• Provably fair randomness</li>
              <li>• Instant payouts</li>
            </ul>
            <Link 
              to="/flight" 
              className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Enter Flight Mode
            </Link>
          </div>

          {/* Cruise Mode Card */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/20">
            <div className="text-4xl mb-4">🚢</div>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Cruise Mode</h2>
            <p className="text-gray-300 mb-6">
              Long-term prediction staking. Lock tokens for 1-7 days 
              and profit from market trend predictions.
            </p>
            <ul className="text-sm text-gray-400 mb-6 space-y-2">
              <li>• 1-7 day staking periods</li>
              <li>• Market trend multipliers</li>
              <li>• Flexible exit strategy</li>
              <li>• Higher potential returns</li>
            </ul>
            <Link 
              to="/cruise" 
              className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Enter Cruise Mode
            </Link>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link 
            to="/leaderboard" 
            className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            View Leaderboard 🏆
          </Link>
        </div>
      </div>
    </div>
  );
}
