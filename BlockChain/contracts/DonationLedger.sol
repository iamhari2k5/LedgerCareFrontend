// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DonationLedger {

    struct Donation {
        uint256 donationId;
        uint256 campaignId;
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    uint256 private nextDonationId = 1;

    mapping(uint256 => Donation) public donations;

    event DonationReceived(
        uint256 indexed donationId,
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );

    event FiatDonationRecorded(
        uint256 indexed donationId,
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amountInFiat,
        string paymentReference,
        uint256 timestamp
    );

    function donate(
        uint256 campaignId
    ) external payable {

        require(msg.value > 0, "Donation must be greater than zero");

        donations[nextDonationId] = Donation({
            donationId: nextDonationId,
            campaignId: campaignId,
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        });

        emit DonationReceived(
            nextDonationId,
            campaignId,
            msg.sender,
            msg.value,
            block.timestamp
        );

        nextDonationId++;
    }

    function recordFiatDonation(
        uint256 campaignId,
        address donor,
        uint256 amountInFiat,
        string memory paymentReference
    ) external {

        require(amountInFiat > 0, "Donation amount must be greater than zero");

        donations[nextDonationId] = Donation({
            donationId: nextDonationId,
            campaignId: campaignId,
            donor: donor,
            amount: amountInFiat,
            timestamp: block.timestamp
        });

        emit DonationReceived(
            nextDonationId,
            campaignId,
            donor,
            amountInFiat,
            block.timestamp
        );

        emit FiatDonationRecorded(
            nextDonationId,
            campaignId,
            donor,
            amountInFiat,
            paymentReference,
            block.timestamp
        );

        nextDonationId++;
    }

    function getDonation(
        uint256 donationId
    )
        external
        view
        returns (Donation memory)
    {
        require(
            donations[donationId].donationId != 0,
            "Donation does not exist"
        );

        return donations[donationId];
    }
}