import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

export default function Navbar() {
  const location = useLocation();
  const { account, connectWallet, disconnect } = useWallet();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl">✈️</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Aviator 2.0
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-white bg-gray-800' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/flight"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/flight') 
                  ? 'text-red-400 bg-red-900/20' 
                  : 'text-gray-300 hover:text-red-400 hover:bg-red-900/10'
              }`}
            >
              Flight Mode
            </Link>
            <Link
              to="/cruise"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/cruise') 
                  ? 'text-blue-400 bg-blue-900/20' 
                  : 'text-gray-300 hover:text-blue-400 hover:bg-blue-900/10'
              }`}
            >
              Cruise Mode
            </Link>
            <Link
              to="/leaderboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/leaderboard') 
                  ? 'text-purple-400 bg-purple-900/20' 
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/10'
              }`}
            >
              Leaderboard
            </Link>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {account ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-300">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
