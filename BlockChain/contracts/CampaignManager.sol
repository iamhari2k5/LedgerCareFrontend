// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CampaignManager {

    enum CampaignStatus {
        Active,
        Completed,
        Cancelled
    }

    struct Campaign {
        uint256 campaignId;
        uint256 charityId;
        address charityWallet;
        string title;
        string description;
        uint256 targetAmount;
        uint256 raisedAmount;
        uint256 startDate;
        uint256 endDate;
        CampaignStatus status;
    }

    uint256 private nextCampaignId = 1;

    mapping(uint256 => Campaign) public campaigns;

    event CampaignCreated(
        uint256 indexed campaignId,
        uint256 indexed charityId,
        address indexed charityWallet,
        string title,
        uint256 targetAmount
    );

    event CampaignCompleted(
        uint256 indexed campaignId
    );

    function createCampaign(
        uint256 charityId,
        string memory title,
        string memory description,
        uint256 targetAmount,
        uint256 startDate,
        uint256 endDate
    ) external {

        require(targetAmount > 0, "Target must be greater than zero");
        require(endDate > startDate, "Invalid campaign dates");

        campaigns[nextCampaignId] = Campaign({
            campaignId: nextCampaignId,
            charityId: charityId,
            charityWallet: msg.sender,
            title: title,
            description: description,
            targetAmount: targetAmount,
            raisedAmount: 0,
            startDate: startDate,
            endDate: endDate,
            status: CampaignStatus.Active
        });

        emit CampaignCreated(
            nextCampaignId,
            charityId,
            msg.sender,
            title,
            targetAmount
        );

        nextCampaignId++;
    }

    function getCampaign(
        uint256 campaignId
    )
        external
        view
        returns (Campaign memory)
    {
        require(
            campaigns[campaignId].campaignId != 0,
            "Campaign does not exist"
        );

        return campaigns[campaignId];
    }
}