import { ethers } from 'ethers';
import { useWallet } from './useWallet';

// Contract ABIs (simplified for MVP)
const AVIATOR_ABI = [
  "function placeBet() external payable",
  "function cashOut(uint256 targetX100) external",
  "function currentRoundId() public view returns (uint256)",
  "function crashMultiplierX100() public view returns (uint256)",
  "function bettingOpen() public view returns (bool)",
  "function bets(address) public view returns (uint256 amountWei, bool active)"
];

const CRUISE_ABI = [
  "function stake(uint32 lockSeconds) external payable",
  "function unstake() external",
  "function canUnstake(address user) public view returns (bool)",
  "function previewPayout(address user) public view returns (uint256 payoutWei, uint256 appliedX100)",
  "function stakes(address) public view returns (uint256 amountWei, uint64 startTs, uint32 lockSeconds, bool active)"
];

// Contract addresses (to be set after deployment)
const AVIATOR_ADDRESS = process.env.REACT_APP_AVIATOR_CONTRACT || "";
const CRUISE_ADDRESS = process.env.REACT_APP_CRUISE_CONTRACT || "";

export function useContracts() {
  const { signer } = useWallet();

  const getAviatorContract = () => {
    if (!signer || !AVIATOR_ADDRESS) return null;
    return new ethers.Contract(AVIATOR_ADDRESS, AVIATOR_ABI, signer);
  };

  const getCruiseContract = () => {
    if (!signer || !CRUISE_ADDRESS) return null;
    return new ethers.Contract(CRUISE_ADDRESS, CRUISE_ABI, signer);
  };

  // Aviator Game Functions
  const placeBet = async (amountEth: string) => {
    const contract = getAviatorContract();
    if (!contract) throw new Error("Contract not available");
    
    const tx = await contract.placeBet({
      value: ethers.parseEther(amountEth)
    });
    await tx.wait();
    return tx;
  };

  const cashOut = async (multiplierX100: number) => {
    const contract = getAviatorContract();
    if (!contract) throw new Error("Contract not available");
    
    const tx = await contract.cashOut(multiplierX100);
    await tx.wait();
    return tx;
  };

  const getGameState = async () => {
    const contract = getAviatorContract();
    if (!contract) return null;
    
    const [roundId, crashMultiplier, bettingOpen] = await Promise.all([
      contract.currentRoundId(),
      contract.crashMultiplierX100(),
      contract.bettingOpen()
    ]);
    
    return {
      roundId: Number(roundId),
      crashMultiplier: Number(crashMultiplier),
      bettingOpen
    };
  };

  // Cruise Mode Functions
  const stakeTokens = async (amountEth: string, lockDays: number) => {
    const contract = getCruiseContract();
    if (!contract) throw new Error("Contract not available");
    
    const lockSeconds = lockDays * 24 * 60 * 60;
    const tx = await contract.stake(lockSeconds, {
      value: ethers.parseEther(amountEth)
    });
    await tx.wait();
    return tx;
  };

  const unstakeTokens = async () => {
    const contract = getCruiseContract();
    if (!contract) throw new Error("Contract not available");
    
    const tx = await contract.unstake();
    await tx.wait();
    return tx;
  };

  const getStakeInfo = async (address: string) => {
    const contract = getCruiseContract();
    if (!contract) return null;
    
    const [canUnstake, previewPayout, stakeData] = await Promise.all([
      contract.canUnstake(address),
      contract.previewPayout(address),
      contract.stakes(address)
    ]);
    
    return {
      canUnstake,
      payoutWei: previewPayout[0],
      appliedMultiplier: previewPayout[1],
      amountWei: stakeData[0],
      startTs: Number(stakeData[1]),
      lockSeconds: Number(stakeData[2]),
      active: stakeData[3]
    };
  };

  return {
    // Contracts
    aviatorContract: getAviatorContract(),
    cruiseContract: getCruiseContract(),
    
    // Aviator functions
    placeBet,
    cashOut,
    getGameState,
    
    // Cruise functions
    stakeTokens,
    unstakeTokens,
    getStakeInfo,
    
    // Contract addresses for reference
    addresses: {
      aviator: AVIATOR_ADDRESS,
      cruise: CRUISE_ADDRESS
    }
  };
}
