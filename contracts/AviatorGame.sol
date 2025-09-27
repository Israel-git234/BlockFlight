// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title AviatorGame (Flight Mode)
/// @notice Minimal MVP crash game with house edge and simple crash generation.
///         This version uses pseudo-randomness for hackathon MVP; replace with
///         Chainlink VRF + price feed driven volatility for production.
contract AviatorGame is Ownable {
    struct Bet {
        uint256 amountWei;
        bool active;
    }

    // Round state
    uint256 public currentRoundId;
    uint256 public crashMultiplierX100; // e.g., 150 => 1.50x
    bool public bettingOpen;

    // Economics
    uint256 public houseEdgeBps = 200; // 2% in basis points
    address public treasury;

    mapping(address => Bet) public bets;

    event RoundOpened(uint256 indexed roundId);
    event RoundClosed(uint256 indexed roundId, uint256 crashMultiplierX100);
    event BetPlaced(address indexed player, uint256 indexed roundId, uint256 amountWei);
    event CashOut(address indexed player, uint256 indexed roundId, uint256 targetX100, uint256 payoutWei);
    event HouseEdgeUpdated(uint256 newHouseEdgeBps);
    event TreasuryUpdated(address newTreasury);

    constructor(address initialOwner, address treasuryAddress) Ownable(initialOwner) {
        require(treasuryAddress != address(0), "treasury=0");
        treasury = treasuryAddress;
        _openNewRound();
    }

    // ------------------------- Admin -------------------------

    function setHouseEdge(uint256 newHouseEdgeBps) external onlyOwner {
        require(newHouseEdgeBps <= 1_000, "edge too high"); // <=10%
        houseEdgeBps = newHouseEdgeBps;
        emit HouseEdgeUpdated(newHouseEdgeBps);
    }

    function setTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "treasury=0");
        treasury = newTreasury;
        emit TreasuryUpdated(newTreasury);
    }

    /// @notice Funds contract liquidity to pay out winners.
    function fund() external payable {}

    // ------------------------- Game Flow -------------------------

    /// @notice Open betting for a new round.
    function _openNewRound() internal {
        currentRoundId += 1;
        crashMultiplierX100 = 0;
        bettingOpen = true;
        emit RoundOpened(currentRoundId);
    }

    /// @notice Close betting and compute crash multiplier using simple formula.
    /// @param volatilityBps Market volatility proxy in basis points (e.g., 0-1000).
    /// @dev For MVP uses block.prevrandao; replace with VRF + price feeds.
    function closeAndSetCrash(uint256 volatilityBps) external onlyOwner {
        require(bettingOpen, "already closed");
        bettingOpen = false;

        // Pseudo-random in [0, 9999]
        uint256 rnd = uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, currentRoundId))) % 10_000;
        // Base 1.00x to ~10.00x scaled by volatility. Simple, deterministic formula.
        uint256 base = 100; // 1.00x
        uint256 volFactor = 100 + (volatilityBps % 2_000); // cap to 300% factor
        crashMultiplierX100 = base + ((rnd * volFactor) / 10_000); // roughly 1.00x - 300.00x

        if (crashMultiplierX100 < 101) {
            crashMultiplierX100 = 101; // never below 1.01x to keep demo fun
        }

        emit RoundClosed(currentRoundId, crashMultiplierX100);
    }

    /// @notice Start the next round after closing the previous one.
    function openNextRound() external onlyOwner {
        require(!bettingOpen, "close first");
        _openNewRound();
    }

    // ------------------------- Player Actions -------------------------

    /// @notice Place a bet during the betting window.
    function placeBet() external payable {
        require(bettingOpen, "betting closed");
        require(msg.value > 0, "no value");
        Bet storage b = bets[msg.sender];
        require(!b.active, "bet exists");
        b.amountWei = msg.value;
        b.active = true;
        emit BetPlaced(msg.sender, currentRoundId, msg.value);
    }

    /// @notice Cash out at a target multiplier less than or equal to crash.
    /// @param targetX100 Multiplier with 2 decimals (e.g., 250 => 2.50x)
    function cashOut(uint256 targetX100) external {
        require(!bettingOpen, "round live");
        require(crashMultiplierX100 > 0, "no crash yet");
        Bet storage b = bets[msg.sender];
        require(b.active, "no bet");
        require(targetX100 >= 101 && targetX100 <= crashMultiplierX100, "bad target");

        uint256 gross = (b.amountWei * targetX100) / 100; // scaled by x100
        uint256 fee = (gross * houseEdgeBps) / 10_000;
        uint256 payout = gross - fee;

        b.active = false;
        b.amountWei = 0;

        // send fee to treasury, payout to player
        if (fee > 0) {
            (bool tf, ) = treasury.call{value: fee}("");
            require(tf, "fee send fail");
        }

        (bool ok, ) = msg.sender.call{value: payout}("");
        require(ok, "payout fail");

        emit CashOut(msg.sender, currentRoundId, targetX100, payout);
    }

    /// @notice If user loses (target above crash), they can clear their bet.
    function forfeitOnCrash() external {
        require(!bettingOpen, "round live");
        require(crashMultiplierX100 > 0, "no crash yet");
        Bet storage b = bets[msg.sender];
        require(b.active, "no bet");
        // If target was above crash, frontend will know; this simply clears.
        b.active = false;
        b.amountWei = 0;
    }
}


