# BlockFlight - Market-Driven Prediction Platform
# use the side branch please

🚀 **Next-Generation DeFi Gaming Platform** built for the BlockDAG EVM-compatible network.

BlockFlight features multiple game modes:
- **✈️ BlockFlight**: Live crash game driven by real-time ETH price volatility
- **🧠 Community Market**: Create and bet on custom real-world predictions
- **🚢 Cruise Mode**: Long-term staking simulation
- **🏆 Leaderboard**: Compete with top players and unlock achievements
- **📊 Live Stats**: Real-time market data and game analytics

## 🎯 Features

### 🎮 Core Gaming Features
- **📊 Real-Time Market Data**: ETH price feeds affect crash probability
- **✈️ Live Crash Game**: Always running, everyone can watch and participate
- **🧠 Community Predictions**: Create custom betting markets
- **🚢 Long-term Staking**: Cruise mode simulation
- **🏆 Competitive Leaderboard**: Global rankings and achievements
- **📈 Live Analytics**: Real-time market data and game statistics

### 🎨 Modern UI/UX
- **💎 Cyberpunk Design**: Futuristic neon aesthetics with smooth animations
- **🌊 Fluid Animations**: Framer Motion powered transitions and effects
- **📱 Responsive Design**: Optimized for all screen sizes
- **🎯 Interactive Elements**: Hover effects, glowing buttons, and visual feedback
- **🌈 Dynamic Themes**: Gradient backgrounds and color-shifting elements

### 🔗 Blockchain Integration
- **🔔 Social Features**: Follow creators, notifications, private groups
- **💎 Modern UI**: React + TypeScript + Tailwind CSS
- **🔗 Wallet Integration**: MetaMask support via ethers.js
- **🌐 EVM Compatible**: Ready for BlockDAG deployment
- **⚡ Real-time Updates**: Live data feeds and instant notifications

## 🛠 Tech Stack

### Frontend Technologies
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **Custom CSS**: Advanced animations and cyberpunk styling
- **Real-time APIs**: CoinGecko integration for live market data

### Smart Contracts
- **Solidity 0.8.20**: Latest stable version
- **Hardhat**: Development framework
- **OpenZeppelin**: Security-tested contracts
- **EVM Compatible**: Ready for BlockDAG deployment

### Blockchain Integration
- **ethers.js**: Ethereum interaction library
- **MetaMask**: Wallet connection
- **Real-time Data**: Live market feeds

## 📦 Project Structure

```
BlockFlight/
├── contracts/              # Smart contracts
│   ├── AviatorGame.sol         # BlockFlight crash game logic
│   ├── CommunityMarket.sol    # Community prediction markets
│   └── CruiseMode.sol         # Long-term staking logic
├── frontend/               # React frontend
│   ├── src/features/          # Game components
│   │   ├── MarketAviator.tsx      # BlockFlight game
│   │   ├── CommunityMarket.tsx    # Community predictions
│   │   ├── CruiseMode.tsx         # Staking simulation
│   │   ├── Leaderboard.tsx        # Rankings & achievements
│   │   └── LiveStats.tsx          # Real-time analytics
│   ├── src/components/         # UI components
│   │   ├── FeatureSelector.tsx    # Game mode selection
│   │   ├── WalletConnect.tsx      # Wallet integration
│   │   └── NotificationsProvider.tsx # Notification system
│   ├── src/lib/               # Utilities & ABIs
│   └── .env                   # Contract addresses
├── scripts/              # Deploy scripts
├── hardhat.config.js     # Hardhat configuration
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask wallet

### 1. Clone & Install
```bash
git clone https://github.com/Israel-git234/BlockFlight.git
cd BlockFlight
npm install
cd frontend && npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your private key and RPC URL
```

### 3. Compile Contracts
```bash
npm run build
```

### 4. Deploy Contracts (Optional)
```bash
# Deploy to BlockDAG testnet
npm run deploy:blockdag
```

### 5. Run Frontend
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to play!

## 🎮 Game Modes

### ✈️ BlockFlight (Market-Driven Crash Game)
- **Live Gameplay**: Always running, everyone can watch
- **Market Integration**: ETH price volatility affects crash probability
- **Real-Time Data**: CoinGecko API feeds for live ETH prices
- **Dynamic Crashes**: 
  - ETH price drops (-2%) → Higher crash chance (+5%)
  - ETH price spikes (+2%) → Lower crash chance (50% reduction)
  - High volatility → More unpredictable crashes
- **Place Bets**: During active rounds
- **Cash Out**: Anytime before crash
- **Visual Effects**: Animated plane, sparkle effects, neon styling

### 🧠 Community Market
- **Custom Predictions**: Create betting markets on any topic
- **YES/NO Betting**: Simple binary prediction format
- **Social Features**: Follow creators, get notifications
- **Private Groups**: Create bets for friends
- **Rich Descriptions**: Analysis and reasoning fields
- **Flexible Timing**: Set custom end dates

### 🚢 Cruise Mode  
- **Long-term Staking**: 1-7 day simulation
- **Market Trends**: Based on ETH price movements
- **Flexible Unstaking**: Exit anytime
- **Higher Returns**: Longer locks = better rewards

### 🏆 Leaderboard & Achievements
- **Global Rankings**: Top players by wins, volume, win rate
- **Achievement System**: Unlock badges for milestones
- **Rarity Levels**: Common, Rare, Epic, Legendary achievements
- **Live Stats**: Real-time player statistics
- **Competitive Elements**: Monthly tournaments and rewards

### 📊 Live Market Analytics
- **Real-Time Data**: ETH price, market cap, volume
- **Game Statistics**: Active players, total volume, biggest wins
- **Market Impact**: Visual correlation between ETH price and game outcomes
- **Interactive Charts**: Live price feeds and volatility indicators

## 🔧 Development

### Smart Contracts
```bash
# Compile contracts
npm run build

# Run tests (TODO)
npm test

# Deploy to network
npm run deploy:blockdag
```

### Frontend
```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Smart Contracts
1. Set up `.env` with private key and RPC URL
2. Fund deployer wallet with testnet ETH
3. Run: `npm run deploy:blockdag`

### Frontend
Deploy to Vercel/Netlify:
```bash
cd frontend
npm run build
# Upload dist/ folder to hosting service
```

## 📝 Environment Variables

### Root `.env` (for deployment):
```env
PRIVATE_KEY=your_private_key_here
BLOCKDAG_RPC_URL=https://your-blockdag-rpc-url
TREASURY=0xYourTreasuryAddress
```

### Frontend `.env` (auto-generated by deploy script):
```env
VITE_AVIATOR_CONTRACT=0x5FbDB2315678afecb367f032d93F642f64180aa3
VITE_CRUISE_CONTRACT=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
VITE_COMMUNITY_MARKET_CONTRACT=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

## 🎯 Hackathon Compliance

### ✅ Technical Requirements
- **Frontend**: React.js with TypeScript  
- **Smart Contracts**: Solidity 0.8.20  
- **EVM Compatible**: BlockDAG ready  
- **Blockchain Integration**: ethers.js  
- **Styling**: Custom CSS with cyberpunk design  
- **Wallet**: MetaMask integration  

### 🏆 Hackathon-Winning Features
- **🎮 Multi-Game Platform**: 5+ different game modes
- **📊 Real-Time Integration**: Live market data affects gameplay
- **🏆 Competitive Elements**: Leaderboards and achievements
- **🎨 Modern UI/UX**: Cyberpunk design with smooth animations
- **📈 Live Analytics**: Real-time statistics and market data
- **🔔 Social Features**: Community-driven prediction markets
- **⚡ Performance**: Optimized for smooth user experience
- **🌐 Scalable Architecture**: Ready for production deployment

## 🚀 Future Enhancements

- [x] ✅ Market-driven crash probability
- [x] ✅ Community prediction markets
- [x] ✅ Social features (follow, notifications)
- [x] ✅ Real-time ETH price integration
- [ ] Chainlink VRF integration
- [ ] NFT reward system
- [ ] Auto-cashout features
- [ ] Mobile app version
- [ ] Multi-chain deployment
- [ ] Advanced analytics dashboard

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built for the BlockDAG Hackathon** 🏆 
