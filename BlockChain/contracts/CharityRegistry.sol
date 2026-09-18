// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CharityRegistry {

    struct Charity {
        uint256 charityId;
        string organizationName;
        string registrationNumber;
        string email;
        address walletAddress;
        bool verified;
        uint256 registeredAt;
    }

    uint256 private nextCharityId = 1;

    mapping(uint256 => Charity) public charities;
    mapping(address => uint256) public walletToCharityId;

    event CharityRegistered(
        uint256 indexed charityId,
        string organizationName,
        address indexed walletAddress,
        uint256 timestamp
    );

    event CharityVerified(
        uint256 indexed charityId,
        uint256 timestamp
    );

    function registerCharity(
        string memory organizationName,
        string memory registrationNumber,
        string memory email
    ) external {

        require(
            walletToCharityId[msg.sender] == 0,
            "Charity already registered"
        );

        charities[nextCharityId] = Charity({
            charityId: nextCharityId,
            organizationName: organizationName,
            registrationNumber: registrationNumber,
            email: email,
            walletAddress: msg.sender,
            verified: false,
            registeredAt: block.timestamp
        });

        walletToCharityId[msg.sender] = nextCharityId;

        emit CharityRegistered(
            nextCharityId,
            organizationName,
            msg.sender,
            block.timestamp
        );

        nextCharityId++;
    }

    function verifyCharity(uint256 charityId) external {

        require(
            charities[charityId].charityId != 0,
            "Charity does not exist"
        );

        charities[charityId].verified = true;

        emit CharityVerified(
            charityId,
            block.timestamp
        );
    }

    function getCharity(
        uint256 charityId
    )
        external
        view
        returns (Charity memory)
    {
        require(
            charities[charityId].charityId != 0,
            "Charity does not exist"
        );

        return charities[charityId];
    }
}