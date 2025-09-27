import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Pause, RotateCcw, TrendingUp, Users, DollarSign } from 'lucide-react';

interface GameState {
  isRunning: boolean;
  multiplier: number;
  canCashOut: boolean;
  hasCrashed: boolean;
  betAmount: number;
  potentialWin: number;
}

export function BlockFlightGame() {
  const [gameState, setGameState] = useState<GameState>({
    isRunning: false,
    multiplier: 1.00,
    canCashOut: false,
    hasCrashed: false,
    betAmount: 0,
    potentialWin: 0
  });

  const [recentGames, setRecentGames] = useState([
    { multiplier: 2.45, crashed: true },
    { multiplier: 1.23, crashed: true },
    { multiplier: 5.67, crashed: true },
    { multiplier: 1.89, crashed: true },
    { multiplier: 3.21, crashed: true }
  ]);

  const [liveStats, setLiveStats] = useState({
    totalPlayers: 1247,
    totalVolume: 45.2,
    biggestWin: 12.34
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isRunning && !gameState.hasCrashed) {
      interval = setInterval(() => {
        setGameState(prev => {
          const newMultiplier = prev.multiplier + 0.01;
          const crashPoint = Math.random() * 10 + 1; // Random crash between 1x-11x
          
          if (newMultiplier >= crashPoint) {
            return {
              ...prev,
              hasCrashed: true,
              isRunning: false,
              canCashOut: false
            };
          }
          
          return {
            ...prev,
            multiplier: newMultiplier,
            canCashOut: newMultiplier > 1.1,
            potentialWin: prev.betAmount * newMultiplier
          };
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [gameState.isRunning, gameState.hasCrashed]);

  const startGame = () => {
    if (gameState.betAmount <= 0) return;
    
    setGameState(prev => ({
      ...prev,
      isRunning: true,
      hasCrashed: false,
      multiplier: 1.00,
      canCashOut: false,
      potentialWin: prev.betAmount
    }));
  };

  const cashOut = () => {
    if (!gameState.canCashOut) return;
    
    setGameState(prev => ({
      ...prev,
      isRunning: false,
      hasCrashed: true
    }));
  };

  const resetGame = () => {
    setGameState({
      isRunning: false,
      multiplier: 1.00,
      canCashOut: false,
      hasCrashed: false,
      betAmount: 0,
      potentialWin: 0
    });
  };

  const setBetAmount = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      betAmount: amount,
      potentialWin: amount
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4"
          >
            BlockFlight Game
          </motion.h1>
          <p className="text-gray-400 text-lg">
            The ultimate crash game experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Game Display */}
                <div className="text-center mb-8">
        <motion.div
                    className="text-6xl font-bold mb-4"
            animate={{ 
                      scale: gameState.isRunning ? [1, 1.05, 1] : 1,
                      color: gameState.hasCrashed ? '#ef4444' : '#10b981'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {gameState.multiplier.toFixed(2)}x
          </motion.div>
          
                  <div className="flex justify-center space-x-4 mb-6">
              <Button
                onClick={startGame}
                      disabled={gameState.isRunning || gameState.betAmount <= 0}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
              >
                <Play className="w-5 h-5 mr-2" />
                      Start Game
              </Button>
                    
              <Button
                onClick={cashOut}
                      disabled={!gameState.canCashOut}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3"
              >
                      <Pause className="w-5 h-5 mr-2" />
                Cash Out
              </Button>
                    
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Betting Controls */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bet Amount (ETH)
                    </label>
                    <input
                      type="number"
                      value={gameState.betAmount}
                      onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      placeholder="0.00"
                      disabled={gameState.isRunning}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Potential Win (ETH)
                    </label>
                    <div className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
                      {gameState.potentialWin.toFixed(4)}
                    </div>
                  </div>
                </div>

                {/* Quick Bet Buttons */}
                <div className="flex space-x-2 mb-6">
                  {[0.01, 0.05, 0.1, 0.25, 0.5, 1.0].map(amount => (
                    <Button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      disabled={gameState.isRunning}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      {amount} ETH
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Stats */}
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Live Stats
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Players Online</span>
                    <span className="text-white font-semibold">{liveStats.totalPlayers}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Volume (24h)</span>
                    <span className="text-white font-semibold">{liveStats.totalVolume} ETH</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Biggest Win</span>
                    <span className="text-green-400 font-semibold">{liveStats.biggestWin}x</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Games */}
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Games</h3>
                
                <div className="space-y-2">
                  {recentGames.map((game, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Game #{recentGames.length - index}</span>
                      <Badge 
                        className={game.crashed ? 'bg-red-500' : 'bg-green-500'}
                      >
                        {game.multiplier.toFixed(2)}x
                      </Badge>
                    </div>
              ))}
            </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockFlightGame;