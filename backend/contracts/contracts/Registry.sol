// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Registry {
    struct Record {
        string title;
        string description;
        string ipfsHash;
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => Record) public records;
    uint256 public recordCount;

    event RecordAdded(
        uint256 recordId,
        string title,
        string description,
        string ipfsHash,
        address owner
    );

    function addRecord(
        string memory _title,
        string memory _description,
        string memory _ipfsHash
    ) public {
        records[recordCount] = Record({
            title: _title,
            description: _description,
            ipfsHash: _ipfsHash,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        emit RecordAdded(
            recordCount,
            _title,
            _description,
            _ipfsHash,
            msg.sender
        );
        recordCount++;
    }

    function getRecord(uint256 _recordId) public view returns (Record memory) {
        return records[_recordId];
    }

    // Add any other necessary functions
}
