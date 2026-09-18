// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FundTracker {

    struct FundAllocation {
        uint256 allocationId;
        uint256 campaignId;
        address recipient;
        uint256 amount;
        string purpose;
        uint256 timestamp;
    }

    uint256 private nextAllocationId = 1;

    mapping(uint256 => FundAllocation) public allocations;

    event FundAllocated(
        uint256 indexed allocationId,
        uint256 indexed campaignId,
        address indexed recipient,
        uint256 amount,
        string purpose
    );

    function recordAllocation(
        uint256 campaignId,
        address recipient,
        uint256 amount,
        string memory purpose
    ) external {

        require(
            recipient != address(0),
            "Invalid recipient"
        );

        require(
            amount > 0,
            "Amount must be greater than zero"
        );

        allocations[nextAllocationId] = FundAllocation({
            allocationId: nextAllocationId,
            campaignId: campaignId,
            recipient: recipient,
            amount: amount,
            purpose: purpose,
            timestamp: block.timestamp
        });

        emit FundAllocated(
            nextAllocationId,
            campaignId,
            recipient,
            amount,
            purpose
        );

        nextAllocationId++;
    }

    function getAllocation(
        uint256 allocationId
    )
        external
        view
        returns (FundAllocation memory)
    {
        return allocations[allocationId];
    }
}