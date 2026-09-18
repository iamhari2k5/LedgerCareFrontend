// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EvidenceRegistry {

    struct Evidence {
        uint256 evidenceId;
        uint256 campaignId;
        bytes32 fileHash;
        string fileName;
        uint256 timestamp;
    }

    uint256 private nextEvidenceId = 1;

    mapping(uint256 => Evidence) public evidenceRecords;

    event EvidenceRegistered(
        uint256 indexed evidenceId,
        uint256 indexed campaignId,
        bytes32 fileHash,
        string fileName,
        uint256 timestamp
    );

    function registerEvidence(
        uint256 campaignId,
        bytes32 fileHash,
        string memory fileName
    ) external {

        require(
            fileHash != bytes32(0),
            "Invalid file hash"
        );

        evidenceRecords[nextEvidenceId] = Evidence({
            evidenceId: nextEvidenceId,
            campaignId: campaignId,
            fileHash: fileHash,
            fileName: fileName,
            timestamp: block.timestamp
        });

        emit EvidenceRegistered(
            nextEvidenceId,
            campaignId,
            fileHash,
            fileName,
            block.timestamp
        );

        nextEvidenceId++;
    }

    function verifyEvidence(
        uint256 evidenceId,
        bytes32 providedHash
    )
        external
        view
        returns (bool)
    {
        return evidenceRecords[evidenceId].fileHash == providedHash;
    }
}