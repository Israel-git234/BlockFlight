# Aviator 2.0 - BlockFlight

🚀 **Market-Driven On-Chain Prediction Game** built for the BlockDAG EVM-compatible network.

Aviator 2.0 features two game modes:
- **Flight Mode**: Classic crash game with market-influenced multipliers
- **Cruise Mode**: Long-term prediction staking (1-7 days)

## 🎯 Features

- **Provably Fair**: Chainlink VRF + market volatility integration
- **Dual Game Modes**: Short-term crash game + long-term staking
- **Modern UI**: React + TypeScript + Tailwind CSS
- **Wallet Integration**: MetaMask support via ethers.js
- **EVM Compatible**: Ready for BlockDAG deployment

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Smart Contracts**: Solidity 0.8.20 + Hardhat + OpenZeppelin
- **Blockchain**: ethers.js for EVM interactions
- **Styling**: TailwindCSS with gradient themes

## 📦 Project Structure

```
aviator-2.0/
├── contracts/           # Smart contracts
│   ├── AviatorGame.sol     # Flight Mode logic
│   └── CruiseMode.sol      # Long-term staking logic
├── frontend/            # React frontend
│   ├── src/pages/          # Game pages
│   ├── src/components/     # UI components
│   └── src/hooks/          # React hooks
├── scripts/             # Deploy scripts
├── hardhat.config.js    # Hardhat configuration
└── .env.example         # Environment template
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

### ✈️ Flight Mode
- Place bets in ETH
- Watch multiplier grow in real-time
- Cash out before crash to win
- Multiplier influenced by market volatility + VRF randomness

### 🚢 Cruise Mode  
- Stake tokens for 1-7 days
- Earn from market trend predictions
- Flexible unstaking anytime
- Higher returns for longer locks

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

Create `.env` in project root:
```env
PRIVATE_KEY=your_private_key_here
BLOCKDAG_RPC_URL=https://your-blockdag-rpc-url
TREASURY=0xYourTreasuryAddress
```

## 🎯 Hackathon Compliance

✅ **Frontend**: React.js with TypeScript  
✅ **Smart Contracts**: Solidity 0.8.20  
✅ **EVM Compatible**: BlockDAG ready  
✅ **Blockchain Integration**: ethers.js  
✅ **Styling**: TailwindCSS  
✅ **Wallet**: MetaMask integration  

## 🚀 Future Enhancements

- [ ] Chainlink Price Feeds integration
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
